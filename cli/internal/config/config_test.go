package config

import (
	"os"
	"testing"
)

func TestLoad(t *testing.T) {
	// Clear any existing environment variables
	os.Unsetenv("HADES_SERVER_URL")
	os.Unsetenv("HADES_SERVER_PORT")
	os.Unsetenv("HADES_API_ENDPOINT")
	os.Unsetenv("HADES_TIMEOUT")
	os.Unsetenv("HADES_DEBUG")
	
	cfg := Load()
	
	if cfg == nil {
		t.Fatal("Load returned nil")
	}
	
	// Test default values
	if cfg.ServerURL != "http://localhost" {
		t.Errorf("Expected ServerURL 'http://localhost', got '%s'", cfg.ServerURL)
	}
	
	if cfg.ServerPort != "8080" {
		t.Errorf("Expected ServerPort '8080', got '%s'", cfg.ServerPort)
	}
	
	if cfg.APIEndpoint != "http://localhost:8080/api/v1/generate" {
		t.Errorf("Expected APIEndpoint 'http://localhost:8080/api/v1/generate', got '%s'", cfg.APIEndpoint)
	}
	
	if cfg.Timeout != 30 {
		t.Errorf("Expected Timeout 30, got %d", cfg.Timeout)
	}
	
	if cfg.Debug != false {
		t.Errorf("Expected Debug false, got %t", cfg.Debug)
	}
}

func TestLoadWithEnvironmentVariables(t *testing.T) {
	// Set environment variables
	os.Setenv("HADES_SERVER_URL", "https://example.com")
	os.Setenv("HADES_SERVER_PORT", "9000")
	os.Setenv("HADES_API_ENDPOINT", "/api/v2/generate")
	os.Setenv("HADES_TIMEOUT", "60")
	os.Setenv("HADES_DEBUG", "true")
	
	defer func() {
		// Clean up
		os.Unsetenv("HADES_SERVER_URL")
		os.Unsetenv("HADES_SERVER_PORT")
		os.Unsetenv("HADES_API_ENDPOINT")
		os.Unsetenv("HADES_TIMEOUT")
		os.Unsetenv("HADES_DEBUG")
	}()
	
	cfg := Load()
	
	if cfg.ServerURL != "https://example.com" {
		t.Errorf("Expected ServerURL 'https://example.com', got '%s'", cfg.ServerURL)
	}
	
	if cfg.ServerPort != "9000" {
		t.Errorf("Expected ServerPort '9000', got '%s'", cfg.ServerPort)
	}
	
	if cfg.APIEndpoint != "https://example.com:9000/api/v2/generate" {
		t.Errorf("Expected APIEndpoint 'https://example.com:9000/api/v2/generate', got '%s'", cfg.APIEndpoint)
	}
	
	if cfg.Timeout != 60 {
		t.Errorf("Expected Timeout 60, got %d", cfg.Timeout)
	}
	
	if cfg.Debug != true {
		t.Errorf("Expected Debug true, got %t", cfg.Debug)
	}
}

func TestLoadWithInvalidEnvironmentVariables(t *testing.T) {
	// Set invalid environment variables
	os.Setenv("HADES_TIMEOUT", "invalid")
	os.Setenv("HADES_DEBUG", "invalid")
	
	defer func() {
		// Clean up
		os.Unsetenv("HADES_TIMEOUT")
		os.Unsetenv("HADES_DEBUG")
	}()
	
	cfg := Load()
	
	// Should use default values for invalid inputs
	if cfg.Timeout != 30 {
		t.Errorf("Expected Timeout 30 for invalid input, got %d", cfg.Timeout)
	}
	
	if cfg.Debug != false {
		t.Errorf("Expected Debug false for invalid input, got %t", cfg.Debug)
	}
}

func TestGetEnv(t *testing.T) {
	// Test with existing environment variable
	os.Setenv("TEST_VAR", "test_value")
	defer os.Unsetenv("TEST_VAR")
	
	result := getEnv("TEST_VAR", "default")
	if result != "test_value" {
		t.Errorf("Expected 'test_value', got '%s'", result)
	}
	
	// Test with non-existing environment variable
	result = getEnv("NONEXISTENT_VAR", "default_value")
	if result != "default_value" {
		t.Errorf("Expected 'default_value', got '%s'", result)
	}
}

func TestGetEnvAsInt(t *testing.T) {
	// Test with valid integer
	os.Setenv("TEST_INT", "42")
	defer os.Unsetenv("TEST_INT")
	
	result := getEnvAsInt("TEST_INT", 10)
	if result != 42 {
		t.Errorf("Expected 42, got %d", result)
	}
	
	// Test with invalid integer
	os.Setenv("TEST_INVALID_INT", "not_a_number")
	defer os.Unsetenv("TEST_INVALID_INT")
	
	result = getEnvAsInt("TEST_INVALID_INT", 10)
	if result != 10 {
		t.Errorf("Expected 10 for invalid input, got %d", result)
	}
	
	// Test with non-existing environment variable
	result = getEnvAsInt("NONEXISTENT_INT", 20)
	if result != 20 {
		t.Errorf("Expected 20 for non-existing var, got %d", result)
	}
}

func TestGetEnvAsBool(t *testing.T) {
	// Test with valid boolean values
	testCases := []struct {
		envValue string
		expected bool
	}{
		{"true", true},
		{"false", false},
		{"TRUE", true},
		{"FALSE", false},
		{"True", true},
		{"False", false},
		{"1", true},
		{"0", false},
	}
	
	for _, tc := range testCases {
		os.Setenv("TEST_BOOL", tc.envValue)
		result := getEnvAsBool("TEST_BOOL", false)
		if result != tc.expected {
			t.Errorf("For env value '%s', expected %t, got %t", tc.envValue, tc.expected, result)
		}
		os.Unsetenv("TEST_BOOL")
	}
	
	// Test with invalid boolean
	os.Setenv("TEST_INVALID_BOOL", "not_a_bool")
	defer os.Unsetenv("TEST_INVALID_BOOL")
	
	result := getEnvAsBool("TEST_INVALID_BOOL", true)
	if result != true {
		t.Errorf("Expected true for invalid input, got %t", result)
	}
	
	// Test with non-existing environment variable
	result = getEnvAsBool("NONEXISTENT_BOOL", false)
	if result != false {
		t.Errorf("Expected false for non-existing var, got %t", result)
	}
}

func TestConfigAPIEndpointConstruction(t *testing.T) {
	// Test that API endpoint is constructed correctly
	os.Setenv("HADES_SERVER_URL", "https://api.example.com")
	os.Setenv("HADES_SERVER_PORT", "443")
	os.Setenv("HADES_API_ENDPOINT", "/v1/generate")
	
	defer func() {
		os.Unsetenv("HADES_SERVER_URL")
		os.Unsetenv("HADES_SERVER_PORT")
		os.Unsetenv("HADES_API_ENDPOINT")
	}()
	
	cfg := Load()
	
	expected := "https://api.example.com:443/v1/generate"
	if cfg.APIEndpoint != expected {
		t.Errorf("Expected APIEndpoint '%s', got '%s'", expected, cfg.APIEndpoint)
	}
}

func BenchmarkLoad(t *testing.B) {
	for i := 0; i < t.N; i++ {
		Load()
	}
}

func BenchmarkGetEnv(t *testing.B) {
	os.Setenv("BENCHMARK_VAR", "benchmark_value")
	defer os.Unsetenv("BENCHMARK_VAR")
	
	t.ResetTimer()
	for i := 0; i < t.N; i++ {
		getEnv("BENCHMARK_VAR", "default")
	}
}

func BenchmarkGetEnvAsInt(t *testing.B) {
	os.Setenv("BENCHMARK_INT", "42")
	defer os.Unsetenv("BENCHMARK_INT")
	
	t.ResetTimer()
	for i := 0; i < t.N; i++ {
		getEnvAsInt("BENCHMARK_INT", 10)
	}
}

func BenchmarkGetEnvAsBool(t *testing.B) {
	os.Setenv("BENCHMARK_BOOL", "true")
	defer os.Unsetenv("BENCHMARK_BOOL")
	
	t.ResetTimer()
	for i := 0; i < t.N; i++ {
		getEnvAsBool("BENCHMARK_BOOL", false)
	}
} 