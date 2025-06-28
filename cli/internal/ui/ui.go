package ui

import (
	"fmt"
	"github.com/fatih/color"
)

// Interface handles all UI-related operations
type Interface struct {
	colors *Colors
}

// Colors holds color functions for consistent styling
type Colors struct {
	Cyan   func(a ...interface{}) string
	Red    func(a ...interface{}) string
	Green  func(a ...interface{}) string
	Yellow func(a ...interface{}) string
	Blue   func(a ...interface{}) string
}

// New creates a new UI interface
func New() *Interface {
	return &Interface{
		colors: &Colors{
			Cyan:   color.New(color.FgCyan).SprintFunc(),
			Red:    color.New(color.FgRed).SprintFunc(),
			Green:  color.New(color.FgGreen).SprintFunc(),
			Yellow: color.New(color.FgYellow).SprintFunc(),
			Blue:   color.New(color.FgBlue).SprintFunc(),
		},
	}
}

// ShowBanner displays the application banner
func (ui *Interface) ShowBanner() {
	fmt.Println(ui.colors.Cyan(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║    ██╗  ██╗ █████╗ ██████╗ ███████╗███████╗                  ║
    ║    ██║  ██║██╔══██╗██╔══██╗██╔════╝██╔════╝                  ║
    ║    ███████║███████║██║  ██║█████╗  ███████╗                  ║
    ║    ██╔══██║██╔══██║██║  ██║██╔══╝  ╚════██║                  ║
    ║    ██║  ██║██║  ██║██████╔╝███████╗███████║                  ║
    ║    ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝                  ║
    ║                                                              ║
    ║                    ` + ui.colors.Red("AI-Powered CLI Interface") + `                  ║
    ║                                                              ║
    ║    ` + ui.colors.Yellow("Type 'help' for available commands") + `                        ║
    ║    ` + ui.colors.Yellow("Type 'exit' or 'quit' to close") + `                            ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
`))
}

// ShowHelp displays the help message
func (ui *Interface) ShowHelp() {
	fmt.Println(ui.colors.Cyan("\n=== Hades CLI Commands ==="))
	fmt.Println(ui.colors.Green("help") + "     - Show this help message")
	fmt.Println(ui.colors.Green("generate") + " - Generate AI response (interactive)")
	fmt.Println(ui.colors.Green("clear") + "    - Clear the terminal")
	fmt.Println(ui.colors.Green("status") + "   - Show server status")
	fmt.Println(ui.colors.Green("config") + "   - Show current configuration")
	fmt.Println(ui.colors.Green("agent") + "    - Start interactive agent mode")
	fmt.Println(ui.colors.Green("exit") + "     - Exit the CLI")
	fmt.Println(ui.colors.Green("quit") + "     - Exit the CLI")
	fmt.Println(ui.colors.Yellow("\nExample: Type 'generate' and then enter your prompt"))
	fmt.Println(ui.colors.Yellow("Example: Type 'agent' to start interactive agent mode"))
}

// ShowStatus displays the current status
func (ui *Interface) ShowStatus(serverURL string) {
	fmt.Println(ui.colors.Green("✓ CLI is running"))
	fmt.Println(ui.colors.Green("✓ Server URL: " + serverURL))
	fmt.Println(ui.colors.Yellow("Note: Make sure your FastAPI server is running"))
}

// ShowConfig displays the current configuration
func (ui *Interface) ShowConfig(config map[string]string) {
	fmt.Println(ui.colors.Cyan("\n=== Current Configuration ==="))
	for key, value := range config {
		fmt.Printf("%s: %s\n", ui.colors.Green(key), value)
	}
}

// Clear clears the terminal screen
func (ui *Interface) Clear() {
	fmt.Print("\033[H\033[2J")
}

// PrintError prints an error message
func (ui *Interface) PrintError(message string) {
	fmt.Println(ui.colors.Red("Error: " + message))
}

// PrintSuccess prints a success message
func (ui *Interface) PrintSuccess(message string) {
	fmt.Println(ui.colors.Green("✓ " + message))
}

// PrintInfo prints an info message
func (ui *Interface) PrintInfo(message string) {
	fmt.Println(ui.colors.Blue("ℹ " + message))
}

// PrintWarning prints a warning message
func (ui *Interface) PrintWarning(message string) {
	fmt.Println(ui.colors.Yellow("⚠ " + message))
} 