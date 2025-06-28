package main

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/NexorTech/Hades/internal/cli"
	"github.com/NexorTech/Hades/internal/config"
)

func main() {
	// Load configuration
	cfg := config.Load()

	// Create CLI instance
	hadesCLI := cli.New(cfg)

	// Handle graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Setup signal handling
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-sigChan
		fmt.Println("\nShutting down gracefully...")
		cancel()
	}()

	// Run the CLI
	if err := hadesCLI.Run(ctx); err != nil {
		fmt.Printf("Error running CLI: %v\n", err)
		os.Exit(1)
	}
} 