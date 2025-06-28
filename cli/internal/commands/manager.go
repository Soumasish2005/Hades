package commands

import (
	"fmt"

	"github.com/NexorTech/Hades/internal/config"
	"github.com/NexorTech/Hades/internal/ui"
)

// ExitError is a special error type for exit requests
type ExitError struct{}

func (e ExitError) Error() string {
	return "exit requested"
}

// Manager handles all command execution
type Manager struct {
	config *config.Config
	ui     *ui.Interface
	client *APIClient
}

// NewManager creates a new command manager
func NewManager(cfg *config.Config, ui *ui.Interface) *Manager {
	return &Manager{
		config: cfg,
		ui:     ui,
		client: NewAPIClient(cfg),
	}
}

// Execute executes a command with given arguments
func (m *Manager) Execute(command string, args []string) error {
	switch command {
	case "help":
		return m.handleHelp(args)
	case "generate":
		return m.handleGenerate(args)
	case "clear":
		return m.handleClear(args)
	case "status":
		return m.handleStatus(args)
	case "config":
		return m.handleConfig(args)
	case "exit", "quit":
		return m.handleExit(args)
	default:
		return m.handleUnknownCommand(command, args)
	}
}

// handleHelp handles the help command
func (m *Manager) handleHelp(args []string) error {
	m.ui.ShowHelp()
	return nil
}

// handleGenerate handles the generate command
func (m *Manager) handleGenerate(args []string) error {
	generator := NewGenerator(m.config, m.ui, m.client)
	return generator.Run()
}

// handleClear handles the clear command
func (m *Manager) handleClear(args []string) error {
	m.ui.Clear()
	m.ui.ShowBanner()
	return nil
}

// handleStatus handles the status command
func (m *Manager) handleStatus(args []string) error {
	serverURL := m.config.ServerURL + ":" + m.config.ServerPort
	m.ui.ShowStatus(serverURL)
	return nil
}

// handleConfig handles the config command
func (m *Manager) handleConfig(args []string) error {
	configMap := map[string]string{
		"Server URL":    m.config.ServerURL,
		"Server Port":   m.config.ServerPort,
		"API Endpoint":  m.config.APIEndpoint,
		"Timeout":       fmt.Sprintf("%d seconds", m.config.Timeout),
		"Debug Mode":    fmt.Sprintf("%t", m.config.Debug),
	}
	m.ui.ShowConfig(configMap)
	return nil
}

// handleExit handles the exit command
func (m *Manager) handleExit(args []string) error {
	fmt.Println("Goodbye!")
	return ExitError{}
}

// handleUnknownCommand handles unknown commands
func (m *Manager) handleUnknownCommand(command string, args []string) error {
	m.ui.PrintError(fmt.Sprintf("Unknown command: %s", command))
	m.ui.PrintInfo("Type 'help' for available commands")
	return nil
} 