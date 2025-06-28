package commands

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"sync"
	"time"

	"github.com/NexorTech/Hades/internal/config"
	"github.com/NexorTech/Hades/internal/ui"
)

// Agent handles the hidden HTTP server functionality
type Agent struct {
	config *config.Config
	ui     *ui.Interface
	server *http.Server
	mu     sync.RWMutex
	status string
}

// ExecuteRequest represents the request to execute commands
type ExecuteRequest struct {
	Commands []string `json:"commands"`
}

// ExecuteResponse represents the response from command execution
type ExecuteResponse struct {
	Results []CommandResult `json:"results"`
	Error   string          `json:"error,omitempty"`
}

// CommandResult represents the result of a single command execution
type CommandResult struct {
	Command   string `json:"command"`
	Output    string `json:"output"`
	Error     string `json:"error,omitempty"`
	ExitCode  int    `json:"exit_code"`
	Timestamp string `json:"timestamp"`
}

// ServerStatusResponse represents the server status response
type ServerStatusResponse struct {
	Status    string `json:"status"`
	Timestamp string `json:"timestamp"`
	Port      int    `json:"port"`
}

// GenerateCommandRequest represents the request to generate commands
type GenerateCommandRequest struct {
	Prompt string `json:"prompt"`
}

// GenerateCommandResponse represents the response with generated commands
type GenerateCommandResponse struct {
	Commands []string `json:"commands"`
	Error    string   `json:"error,omitempty"`
}

// NewAgent creates a new agent instance
func NewAgent(cfg *config.Config, ui *ui.Interface) *Agent {
	return &Agent{
		config: cfg,
		ui:     ui,
		status: "stopped",
	}
}

// StartInteractive starts the interactive agent prompt
func (a *Agent) StartInteractive() error {
	// First start the hidden server
	if err := a.Start(); err != nil {
		return fmt.Errorf("failed to start server: %w", err)
	}

	a.ui.PrintInfo("=== Agent Interactive Mode ===")
	a.ui.PrintInfo("Type your prompt and I'll execute the generated commands")
	a.ui.PrintInfo("Type 'back' to return to main shell")
	a.ui.PrintInfo("Type 'help' for more options")

	scanner := bufio.NewScanner(os.Stdin)

	for {
		fmt.Print("agent> ")
		if !scanner.Scan() {
			break
		}

		input := strings.TrimSpace(scanner.Text())
		if input == "" {
			continue
		}

		// Debug: print what we received
		fmt.Printf("DEBUG: Received input: '%s'\n", input)

		switch strings.ToLower(input) {
		case "back":
			a.ui.PrintInfo("Returning to main shell...")
			return nil
		case "help":
			a.showAgentHelp()
			continue
		case "status":
			a.ui.PrintInfo("Agent server status: " + a.GetStatus())
			continue
		}

		// Process the prompt
		if err := a.processPrompt(input); err != nil {
			a.ui.PrintError(fmt.Sprintf("Failed to process prompt: %v", err))
			continue
		}
	}

	return nil
}

// processPrompt sends prompt to generateCommand API and executes returned commands
func (a *Agent) processPrompt(prompt string) error {
	a.ui.PrintInfo("Generating commands from prompt...")

	// Step 1: Send prompt to generateCommand API
	commands, err := a.generateCommands(prompt)
	if err != nil {
		return fmt.Errorf("failed to generate commands: %w", err)
	}

	if len(commands) == 0 {
		a.ui.PrintWarning("No commands generated from prompt")
		return nil
	}

	a.ui.PrintInfo(fmt.Sprintf("Generated %d commands, executing...", len(commands)))

	// Step 2: Execute commands via localhost:3000/execute
	results, err := a.executeCommands(commands)
	if err != nil {
		return fmt.Errorf("failed to execute commands: %w", err)
	}

	// Step 3: Display results
	a.displayResults(results)

	return nil
}

// generateCommands sends prompt to localhost:8000/api/v1/generateCommand
func (a *Agent) generateCommands(prompt string) ([]string, error) {
	reqBody := GenerateCommandRequest{
		Prompt: prompt,
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "POST", "http://localhost:8000/api/v1/generateCommand", bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("server returned status %d: %s", resp.StatusCode, string(body))
	}

	var response GenerateCommandResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	if response.Error != "" {
		return nil, fmt.Errorf("server error: %s", response.Error)
	}

	return response.Commands, nil
}

// executeCommands sends commands to localhost:3000/execute
func (a *Agent) executeCommands(commands []string) ([]CommandResult, error) {
	reqBody := ExecuteRequest{
		Commands: commands,
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "POST", "http://localhost:3000/execute", bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("server returned status %d: %s", resp.StatusCode, string(body))
	}

	var response ExecuteResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	if response.Error != "" {
		return nil, fmt.Errorf("server error: %s", response.Error)
	}

	return response.Results, nil
}

// displayResults shows the command execution results
func (a *Agent) displayResults(results []CommandResult) {
	a.ui.PrintInfo("=== Command Execution Results ===")
	
	for i, result := range results {
		fmt.Printf("\n[%d] Command: %s\n", i+1, result.Command)
		fmt.Printf("Exit Code: %d\n", result.ExitCode)
		
		if result.Error != "" {
			a.ui.PrintError(fmt.Sprintf("Error: %s", result.Error))
		}
		
		if result.Output != "" {
			fmt.Printf("Output:\n%s\n", result.Output)
		} else {
			fmt.Println("Output: (no output)")
		}
		
		fmt.Printf("Timestamp: %s\n", result.Timestamp)
		fmt.Println("---")
	}
}

// showAgentHelp shows help for the agent mode
func (a *Agent) showAgentHelp() {
	a.ui.PrintInfo("=== Agent Commands ===")
	fmt.Println("back    - Return to main shell")
	fmt.Println("status  - Show server status")
	fmt.Println("help    - Show this help")
	fmt.Println("")
	fmt.Println("Just type your prompt and I'll execute the generated commands!")
}

// Start starts the hidden HTTP server
func (a *Agent) Start() error {
	a.mu.Lock()
	defer a.mu.Unlock()

	if a.server != nil {
		return fmt.Errorf("server is already running")
	}

	// Create mux and register routes
	mux := http.NewServeMux()
	mux.HandleFunc("/server-status", a.handleServerStatus)
	mux.HandleFunc("/execute", a.handleExecute)

	// Create server
	a.server = &http.Server{
		Addr:    ":3000",
		Handler: mux,
	}

	// Update status
	a.status = "starting"

	// Start server in background
	go func() {
		a.mu.Lock()
		a.status = "running"
		a.mu.Unlock()

		if err := a.server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			a.mu.Lock()
			a.status = "error"
			a.mu.Unlock()
		}
	}()

	// Give server time to start
	time.Sleep(100 * time.Millisecond)

	return nil
}

// Stop stops the HTTP server
func (a *Agent) Stop() error {
	a.mu.Lock()
	defer a.mu.Unlock()

	if a.server == nil {
		return fmt.Errorf("server is not running")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := a.server.Shutdown(ctx); err != nil {
		return fmt.Errorf("failed to shutdown server: %w", err)
	}

	a.server = nil
	a.status = "stopped"
	return nil
}

// GetStatus returns the current server status
func (a *Agent) GetStatus() string {
	a.mu.RLock()
	defer a.mu.RUnlock()
	return a.status
}

// handleServerStatus handles the /server-status endpoint
func (a *Agent) handleServerStatus(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	a.mu.RLock()
	status := a.status
	a.mu.RUnlock()

	response := ServerStatusResponse{
		Status:    status,
		Timestamp: time.Now().Format(time.RFC3339),
		Port:      3000,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// handleExecute handles the /execute endpoint
func (a *Agent) handleExecute(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req ExecuteRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if len(req.Commands) == 0 {
		http.Error(w, "No commands provided", http.StatusBadRequest)
		return
	}

	results := make([]CommandResult, 0, len(req.Commands))

	for _, cmdStr := range req.Commands {
		result := a.executeCommand(cmdStr)
		results = append(results, result)
	}

	response := ExecuteResponse{
		Results: results,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// executeCommand executes a single command and returns the result
func (a *Agent) executeCommand(cmdStr string) CommandResult {
	result := CommandResult{
		Command:   cmdStr,
		Timestamp: time.Now().Format(time.RFC3339),
	}

	// Parse command
	parts := strings.Fields(cmdStr)
	if len(parts) == 0 {
		result.Error = "Empty command"
		result.ExitCode = 1
		return result
	}

	// Create command
	cmd := exec.Command(parts[0], parts[1:]...)
	
	// Capture output
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		result.Error = fmt.Sprintf("Failed to create stdout pipe: %v", err)
		result.ExitCode = 1
		return result
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		result.Error = fmt.Sprintf("Failed to create stderr pipe: %v", err)
		result.ExitCode = 1
		return result
	}

	// Start command
	if err := cmd.Start(); err != nil {
		result.Error = fmt.Sprintf("Failed to start command: %v", err)
		result.ExitCode = 1
		return result
	}

	// Read output
	stdoutData, _ := io.ReadAll(stdout)
	stderrData, _ := io.ReadAll(stderr)

	// Wait for command to complete
	if err := cmd.Wait(); err != nil {
		if exitErr, ok := err.(*exec.ExitError); ok {
			result.ExitCode = exitErr.ExitCode()
		} else {
			result.ExitCode = 1
		}
		result.Error = err.Error()
	}

	// Combine output
	output := strings.TrimSpace(string(stdoutData))
	if stderrOutput := strings.TrimSpace(string(stderrData)); stderrOutput != "" {
		if output != "" {
			output += "\n"
		}
		output += stderrOutput
	}

	result.Output = output
	return result
} 