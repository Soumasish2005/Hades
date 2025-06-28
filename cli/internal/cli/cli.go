package cli

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/NexorTech/Hades/internal/config"
	"github.com/NexorTech/Hades/internal/commands"
	"github.com/NexorTech/Hades/internal/ui"
	"github.com/fatih/color"
)

// CLI represents the main CLI application
type CLI struct {
	config   *config.Config
	commands *commands.Manager
	ui       *ui.Interface
}

// New creates a new CLI instance
func New(cfg *config.Config) *CLI {
	ui := ui.New()
	cmdManager := commands.NewManager(cfg, ui)
	
	return &CLI{
		config:   cfg,
		commands: cmdManager,
		ui:       ui,
	}
}

// Run starts the CLI application
func (c *CLI) Run(ctx context.Context) error {
	// Show banner
	c.ui.ShowBanner()

	// CLI loop
	scanner := bufio.NewScanner(os.Stdin)
	cyan := color.New(color.FgCyan).SprintFunc()

	for {
		select {
		case <-ctx.Done():
			fmt.Println("Goodbye!")
			return nil
		default:
			fmt.Print(cyan("hades> "))
			if !scanner.Scan() {
				return nil
			}

			input := strings.TrimSpace(scanner.Text())
			if input == "" {
				continue
			}

			// Parse and execute command
			if err := c.executeCommand(input); err != nil {
				// Check if this is an exit request
				if _, ok := err.(commands.ExitError); ok {
					return nil // Exit gracefully
				}
				fmt.Printf("Error: %v\n", err)
			}
		}
	}
}

// executeCommand parses and executes a command
func (c *CLI) executeCommand(input string) error {
	parts := strings.Fields(input)
	if len(parts) == 0 {
		return nil
	}

	command := strings.ToLower(parts[0])
	args := parts[1:]

	return c.commands.Execute(command, args)
} 