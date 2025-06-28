package ui

import (
	"io"
	"os"
	"strings"
	"testing"
)

func TestNew(t *testing.T) {
	ui := New()
	
	if ui == nil {
		t.Fatal("New returned nil")
	}
	
	if ui.colors == nil {
		t.Error("UI colors not initialized")
	}
	
	if ui.colors.Cyan == nil {
		t.Error("Cyan color function not initialized")
	}
	
	if ui.colors.Red == nil {
		t.Error("Red color function not initialized")
	}
	
	if ui.colors.Green == nil {
		t.Error("Green color function not initialized")
	}
	
	if ui.colors.Yellow == nil {
		t.Error("Yellow color function not initialized")
	}
	
	if ui.colors.Blue == nil {
		t.Error("Blue color function not initialized")
	}
}

func TestShowBanner(t *testing.T) {
	ui := New()
	
	// Capture output
	oldStdout := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	
	ui.ShowBanner()
	
	w.Close()
	os.Stdout = oldStdout
	
	output, err := io.ReadAll(r)
	if err != nil {
		t.Fatalf("Failed to read output: %v", err)
	}
	
	outputStr := string(output)
	
	// Check that banner contains expected content
	if !strings.Contains(outputStr, "HADES") {
		t.Error("Banner should contain 'HADES'")
	}
	
	if !strings.Contains(outputStr, "AI-Powered CLI Interface") {
		t.Error("Banner should contain 'AI-Powered CLI Interface'")
	}
	
	if !strings.Contains(outputStr, "Type 'help' for available commands") {
		t.Error("Banner should contain help instruction")
	}
}

func TestShowHelp(t *testing.T) {
	ui := New()
	
	// Capture output
	oldStdout := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	
	ui.ShowHelp()
	
	w.Close()
	os.Stdout = oldStdout
	
	output, err := io.ReadAll(r)
	if err != nil {
		t.Fatalf("Failed to read output: %v", err)
	}
	
	outputStr := string(output)
	
	// Check that help contains expected content
	if !strings.Contains(outputStr, "=== Hades CLI Commands ===") {
		t.Error("Help should contain commands header")
	}
	
	if !strings.Contains(outputStr, "help") {
		t.Error("Help should contain help command")
	}
	
	if !strings.Contains(outputStr, "generate") {
		t.Error("Help should contain generate command")
	}
	
	if !strings.Contains(outputStr, "clear") {
		t.Error("Help should contain clear command")
	}
	
	if !strings.Contains(outputStr, "status") {
		t.Error("Help should contain status command")
	}
	
	if !strings.Contains(outputStr, "config") {
		t.Error("Help should contain config command")
	}
	
	if !strings.Contains(outputStr, "agent") {
		t.Error("Help should contain agent command")
	}
	
	if !strings.Contains(outputStr, "exit") {
		t.Error("Help should contain exit command")
	}
	
	if !strings.Contains(outputStr, "quit") {
		t.Error("Help should contain quit command")
	}
}

func TestShowStatus(t *testing.T) {
	ui := New()
	
	// Capture output
	oldStdout := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	
	ui.ShowStatus("http://localhost:8080")
	
	w.Close()
	os.Stdout = oldStdout
	
	output, err := io.ReadAll(r)
	if err != nil {
		t.Fatalf("Failed to read output: %v", err)
	}
	
	outputStr := string(output)
	
	// Check that status contains expected content
	if !strings.Contains(outputStr, "CLI is running") {
		t.Error("Status should contain 'CLI is running'")
	}
	
	if !strings.Contains(outputStr, "http://localhost:8080") {
		t.Error("Status should contain server URL")
	}
	
	if !strings.Contains(outputStr, "FastAPI server") {
		t.Error("Status should contain FastAPI server note")
	}
}

func TestShowConfig(t *testing.T) {
	ui := New()
	
	configMap := map[string]string{
		"Server URL":   "http://localhost",
		"Server Port":  "8080",
		"API Endpoint": "/api/v1/generate",
		"Timeout":      "30 seconds",
		"Debug Mode":   "false",
	}
	
	// Capture output
	oldStdout := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	
	ui.ShowConfig(configMap)
	
	w.Close()
	os.Stdout = oldStdout
	
	output, err := io.ReadAll(r)
	if err != nil {
		t.Fatalf("Failed to read output: %v", err)
	}
	
	outputStr := string(output)
	
	// Check that config contains expected content
	if !strings.Contains(outputStr, "=== Current Configuration ===") {
		t.Error("Config should contain configuration header")
	}
	
	if !strings.Contains(outputStr, "Server URL") {
		t.Error("Config should contain Server URL")
	}
	
	if !strings.Contains(outputStr, "Server Port") {
		t.Error("Config should contain Server Port")
	}
	
	if !strings.Contains(outputStr, "API Endpoint") {
		t.Error("Config should contain API Endpoint")
	}
	
	if !strings.Contains(outputStr, "Timeout") {
		t.Error("Config should contain Timeout")
	}
	
	if !strings.Contains(outputStr, "Debug Mode") {
		t.Error("Config should contain Debug Mode")
	}
}

func TestClear(t *testing.T) {
	ui := New()
	
	// This should not panic
	ui.Clear()
}

func TestPrintError(t *testing.T) {
	ui := New()
	
	// Capture output
	oldStdout := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	
	ui.PrintError("test error message")
	
	w.Close()
	os.Stdout = oldStdout
	
	output, err := io.ReadAll(r)
	if err != nil {
		t.Fatalf("Failed to read output: %v", err)
	}
	
	outputStr := string(output)
	
	// Check that error message contains expected content
	if !strings.Contains(outputStr, "Error: test error message") {
		t.Error("Error message should contain 'Error: test error message'")
	}
}

func TestPrintSuccess(t *testing.T) {
	ui := New()
	
	// Capture output
	oldStdout := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	
	ui.PrintSuccess("test success message")
	
	w.Close()
	os.Stdout = oldStdout
	
	output, err := io.ReadAll(r)
	if err != nil {
		t.Fatalf("Failed to read output: %v", err)
	}
	
	outputStr := string(output)
	
	// Check that success message contains expected content
	if !strings.Contains(outputStr, "✓ test success message") {
		t.Error("Success message should contain '✓ test success message'")
	}
}

func TestPrintInfo(t *testing.T) {
	ui := New()
	
	// Capture output
	oldStdout := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	
	ui.PrintInfo("test info message")
	
	w.Close()
	os.Stdout = oldStdout
	
	output, err := io.ReadAll(r)
	if err != nil {
		t.Fatalf("Failed to read output: %v", err)
	}
	
	outputStr := string(output)
	
	// Check that info message contains expected content
	if !strings.Contains(outputStr, "ℹ test info message") {
		t.Error("Info message should contain 'ℹ test info message'")
	}
}

func TestPrintWarning(t *testing.T) {
	ui := New()
	
	// Capture output
	oldStdout := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w
	
	ui.PrintWarning("test warning message")
	
	w.Close()
	os.Stdout = oldStdout
	
	output, err := io.ReadAll(r)
	if err != nil {
		t.Fatalf("Failed to read output: %v", err)
	}
	
	outputStr := string(output)
	
	// Check that warning message contains expected content
	if !strings.Contains(outputStr, "⚠ test warning message") {
		t.Error("Warning message should contain '⚠ test warning message'")
	}
}

func TestColorFunctions(t *testing.T) {
	ui := New()
	
	// Test that color functions work without panicking
	cyanText := ui.colors.Cyan("test cyan")
	if cyanText == "" {
		t.Error("Cyan color function returned empty string")
	}
	
	redText := ui.colors.Red("test red")
	if redText == "" {
		t.Error("Red color function returned empty string")
	}
	
	greenText := ui.colors.Green("test green")
	if greenText == "" {
		t.Error("Green color function returned empty string")
	}
	
	yellowText := ui.colors.Yellow("test yellow")
	if yellowText == "" {
		t.Error("Yellow color function returned empty string")
	}
	
	blueText := ui.colors.Blue("test blue")
	if blueText == "" {
		t.Error("Blue color function returned empty string")
	}
}

func BenchmarkShowBanner(t *testing.B) {
	ui := New()
	
	t.ResetTimer()
	for i := 0; i < t.N; i++ {
		// Capture output to avoid cluttering test output
		oldStdout := os.Stdout
		_, w, _ := os.Pipe()
		os.Stdout = w
		
		ui.ShowBanner()
		
		w.Close()
		os.Stdout = oldStdout
	}
}

func BenchmarkShowHelp(t *testing.B) {
	ui := New()
	
	t.ResetTimer()
	for i := 0; i < t.N; i++ {
		// Capture output to avoid cluttering test output
		oldStdout := os.Stdout
		_, w, _ := os.Pipe()
		os.Stdout = w
		
		ui.ShowHelp()
		
		w.Close()
		os.Stdout = oldStdout
	}
}

func BenchmarkPrintError(t *testing.B) {
	ui := New()
	
	t.ResetTimer()
	for i := 0; i < t.N; i++ {
		// Capture output to avoid cluttering test output
		oldStdout := os.Stdout
		_, w, _ := os.Pipe()
		os.Stdout = w
		
		ui.PrintError("benchmark error message")
		
		w.Close()
		os.Stdout = oldStdout
	}
}

func BenchmarkColorFunctions(t *testing.B) {
	ui := New()
	
	t.ResetTimer()
	for i := 0; i < t.N; i++ {
		ui.colors.Cyan("benchmark cyan")
		ui.colors.Red("benchmark red")
		ui.colors.Green("benchmark green")
		ui.colors.Yellow("benchmark yellow")
		ui.colors.Blue("benchmark blue")
	}
} 