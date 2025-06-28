package commands

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/NexorTech/Hades/internal/config"
	"github.com/NexorTech/Hades/internal/ui"
)

// Generator handles interactive AI generation sessions
type Generator struct {
	config *config.Config
	ui     *ui.Interface
	client *APIClient
	context string
}

// NewGenerator creates a new generator instance
func NewGenerator(cfg *config.Config, ui *ui.Interface, client *APIClient) *Generator {
	return &Generator{
		config: cfg,
		ui:     ui,
		client: client,
		context: "",
	}
}

// Run starts the interactive generation session
func (g *Generator) Run() error {
	g.ui.PrintInfo("=== AI Generation Mode ===")
	g.ui.PrintInfo("Enter your prompt (or 'back' to return to main shell)")
	g.ui.PrintInfo("Type 'clear' to clear context, 'help' for more options")

	scanner := bufio.NewScanner(os.Stdin)

	for {
		fmt.Print("prompt> ")
		if !scanner.Scan() {
			break
		}

		input := strings.TrimSpace(scanner.Text())
		if input == "" {
			continue
		}

		switch strings.ToLower(input) {
		case "back":
			return nil
		case "clear":
			g.context = ""
			g.ui.PrintSuccess("Context cleared")
			continue
		case "help":
			g.showGeneratorHelp()
			continue
		case "context":
			g.showContext()
			continue
		}

		// Generate response
		if err := g.generateResponse(input); err != nil {
			g.ui.PrintError(fmt.Sprintf("Generation failed: %v", err))
			continue
		}
	}

	return nil
}

// generateResponse generates a response for the given prompt
func (g *Generator) generateResponse(prompt string) error {
	g.ui.PrintInfo("Generating response...")

	response, err := g.client.Generate(prompt, g.context)
	if err != nil {
		return err
	}

	// Update context
	if response.Context != "" {
		g.context = response.Context
	}

	// Display response
	g.ui.PrintInfo("=== Generated Response ===")
	fmt.Println(response.Text)
	g.ui.PrintInfo("=== End Response ===")

	return nil
}

// showGeneratorHelp shows help for the generator mode
func (g *Generator) showGeneratorHelp() {
	g.ui.PrintInfo("=== Generator Commands ===")
	fmt.Println("back    - Return to main shell")
	fmt.Println("clear   - Clear conversation context")
	fmt.Println("context - Show current context")
	fmt.Println("help    - Show this help")
	fmt.Println("")
	fmt.Println("Just type your prompt to generate a response!")
}

// showContext shows the current conversation context
func (g *Generator) showContext() {
	if g.context == "" {
		g.ui.PrintInfo("No context available")
	} else {
		g.ui.PrintInfo("=== Current Context ===")
		fmt.Println(g.context)
		g.ui.PrintInfo("=== End Context ===")
	}
} 