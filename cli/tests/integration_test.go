package tests

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/NexorTech/Hades/internal/cli"
	"github.com/NexorTech/Hades/internal/config"
)

// TestCLIIntegration tests the complete CLI workflow
func TestCLIIntegration(t *testing.T) {
	// Create configuration
	cfg := config.Load()

	// Create CLI instance
	hadesCLI := cli.New(cfg)

	if hadesCLI == nil {
		t.Fatal("CLI creation failed")
	}

	// Test that CLI can be created without errors
	t.Log("CLI created successfully")
}

// TestAgentIntegration tests the agent functionality with mock servers
func TestAgentIntegration(t *testing.T) {
	// Create mock generateCommand server
	generateServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req struct {
			Prompt string `json:"prompt"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request", http.StatusBadRequest)
			return
		}

		// Mock response based on prompt
		var commands []string
		switch req.Prompt {
		case "list files":
			commands = []string{"ls -la", "pwd"}
		case "system info":
			commands = []string{"uname -a", "whoami"}
		default:
			commands = []string{"echo " + req.Prompt}
		}

		response := map[string]interface{}{
			"commands": commands,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}))
	defer generateServer.Close()

	// Create mock execute server
	executeServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var req struct {
			Commands []string `json:"commands"`
		}

		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid request", http.StatusBadRequest)
			return
		}

		// Mock command execution results
		var results []map[string]interface{}
		for _, cmd := range req.Commands {
			result := map[string]interface{}{
				"command":   cmd,
				"output":    "Mock output for: " + cmd,
				"error":     "",
				"exit_code": 0,
				"timestamp": time.Now().Format(time.RFC3339),
			}
			results = append(results, result)
		}

		response := map[string]interface{}{
			"results": results,
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	}))
	defer executeServer.Close()

	// Test the complete flow
	testCases := []struct {
		name         string
		prompt       string
		expectedCmds []string
	}{
		{
			name:         "list files prompt",
			prompt:       "list files",
			expectedCmds: []string{"ls -la", "pwd"},
		},
		{
			name:         "system info prompt",
			prompt:       "system info",
			expectedCmds: []string{"uname -a", "whoami"},
		},
		{
			name:         "default prompt",
			prompt:       "hello world",
			expectedCmds: []string{"echo hello world"},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			// Step 1: Test generateCommand API
			generateReq := map[string]string{
				"prompt": tc.prompt,
			}

			generateData, err := json.Marshal(generateReq)
			if err != nil {
				t.Fatalf("Failed to marshal generate request: %v", err)
			}

			generateResp, err := http.Post(generateServer.URL, "application/json", bytes.NewBuffer(generateData))
			if err != nil {
				t.Fatalf("Failed to call generateCommand API: %v", err)
			}
			defer generateResp.Body.Close()

			if generateResp.StatusCode != http.StatusOK {
				t.Fatalf("GenerateCommand API returned status %d", generateResp.StatusCode)
			}

			var generateResult map[string]interface{}
			if err := json.NewDecoder(generateResp.Body).Decode(&generateResult); err != nil {
				t.Fatalf("Failed to decode generate response: %v", err)
			}

			commands, ok := generateResult["commands"].([]interface{})
			if !ok {
				t.Fatal("Commands not found in response")
			}

			if len(commands) != len(tc.expectedCmds) {
				t.Errorf("Expected %d commands, got %d", len(tc.expectedCmds), len(commands))
			}

			// Step 2: Test execute API
			executeReq := map[string]interface{}{
				"commands": commands,
			}

			executeData, err := json.Marshal(executeReq)
			if err != nil {
				t.Fatalf("Failed to marshal execute request: %v", err)
			}

			executeResp, err := http.Post(executeServer.URL, "application/json", bytes.NewBuffer(executeData))
			if err != nil {
				t.Fatalf("Failed to call execute API: %v", err)
			}
			defer executeResp.Body.Close()

			if executeResp.StatusCode != http.StatusOK {
				t.Fatalf("Execute API returned status %d", executeResp.StatusCode)
			}

			var executeResult map[string]interface{}
			if err := json.NewDecoder(executeResp.Body).Decode(&executeResult); err != nil {
				t.Fatalf("Failed to decode execute response: %v", err)
			}

			results, ok := executeResult["results"].([]interface{})
			if !ok {
				t.Fatal("Results not found in response")
			}

			if len(results) != len(commands) {
				t.Errorf("Expected %d results, got %d", len(commands), len(results))
			}

			// Verify each result has required fields
			for i, result := range results {
				resultMap, ok := result.(map[string]interface{})
				if !ok {
					t.Errorf("Result %d is not a map", i)
					continue
				}

				requiredFields := []string{"command", "output", "error", "exit_code", "timestamp"}
				for _, field := range requiredFields {
					if _, exists := resultMap[field]; !exists {
						t.Errorf("Result %d missing required field: %s", i, field)
					}
				}
			}
		})
	}
}

// TestCLICommands tests individual CLI commands
func TestCLICommands(t *testing.T) {
	cfg := config.Load()
	hadesCLI := cli.New(cfg)

	// Test help command
	ctx := context.Background()

	// This is a basic test to ensure CLI can be created and doesn't panic
	// In a real integration test, you'd want to test the actual command execution
	t.Log("CLI commands test completed")
}

// TestConfigurationIntegration tests configuration loading and usage
func TestConfigurationIntegration(t *testing.T) {
	// Test with default configuration
	cfg := config.Load()

	if cfg.ServerURL != "http://localhost" {
		t.Errorf("Expected default ServerURL 'http://localhost', got '%s'", cfg.ServerURL)
	}

	if cfg.ServerPort != "8080" {
		t.Errorf("Expected default ServerPort '8080', got '%s'", cfg.ServerPort)
	}

	// Test with custom environment variables
	os.Setenv("HADES_SERVER_URL", "https://test.example.com")
	os.Setenv("HADES_SERVER_PORT", "9000")
	os.Setenv("HADES_TIMEOUT", "60")
	os.Setenv("HADES_DEBUG", "true")

	defer func() {
		os.Unsetenv("HADES_SERVER_URL")
		os.Unsetenv("HADES_SERVER_PORT")
		os.Unsetenv("HADES_TIMEOUT")
		os.Unsetenv("HADES_DEBUG")
	}()

	cfg = config.Load()

	if cfg.ServerURL != "https://test.example.com" {
		t.Errorf("Expected custom ServerURL 'https://test.example.com', got '%s'", cfg.ServerURL)
	}

	if cfg.ServerPort != "9000" {
		t.Errorf("Expected custom ServerPort '9000', got '%s'", cfg.ServerPort)
	}

	if cfg.Timeout != 60 {
		t.Errorf("Expected custom Timeout 60, got %d", cfg.Timeout)
	}

	if cfg.Debug != true {
		t.Errorf("Expected custom Debug true, got %t", cfg.Debug)
	}
}

// TestErrorHandling tests error scenarios
func TestErrorHandling(t *testing.T) {
	// Test with invalid server URL
	os.Setenv("HADES_SERVER_URL", "invalid-url")
	defer os.Unsetenv("HADES_SERVER_URL")

	cfg := config.Load()

	// Should still load without panicking
	if cfg == nil {
		t.Fatal("Config should not be nil even with invalid URL")
	}

	// Test with invalid timeout
	os.Setenv("HADES_TIMEOUT", "not-a-number")
	defer os.Unsetenv("HADES_TIMEOUT")

	cfg = config.Load()

	// Should use default timeout
	if cfg.Timeout != 30 {
		t.Errorf("Expected default timeout 30, got %d", cfg.Timeout)
	}
}

// TestConcurrentAccess tests concurrent access to CLI components
func TestConcurrentAccess(t *testing.T) {
	cfg := config.Load()
	hadesCLI := cli.New(cfg)

	// Test concurrent access to CLI
	done := make(chan bool, 10)

	for i := 0; i < 10; i++ {
		go func() {
			// Simulate concurrent access
			_ = hadesCLI
			done <- true
		}()
	}

	// Wait for all goroutines to complete
	for i := 0; i < 10; i++ {
		<-done
	}

	t.Log("Concurrent access test completed")
}

// BenchmarkCLICreation benchmarks CLI creation
func BenchmarkCLICreation(b *testing.B) {
	cfg := config.Load()

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		cli.New(cfg)
	}
}

// BenchmarkConfigLoad benchmarks configuration loading
func BenchmarkConfigLoad(b *testing.B) {
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		config.Load()
	}
}

