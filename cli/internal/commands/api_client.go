package commands

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/NexorTech/Hades/internal/config"
)

// APIClient handles communication with the FastAPI server
type APIClient struct {
	config *config.Config
	client *http.Client
}

// GenerateRequest represents the request to the AI generation API
type GenerateRequest struct {
	Prompt  string `json:"prompt"`
	Context string `json:"context,omitempty"`
}

// GenerateResponse represents the response from the AI generation API
type GenerateResponse struct {
	Text    string `json:"text"`
	Context string `json:"context,omitempty"`
	Error   string `json:"error,omitempty"`
}

// NewAPIClient creates a new API client
func NewAPIClient(cfg *config.Config) *APIClient {
	return &APIClient{
		config: cfg,
		client: &http.Client{
			Timeout: time.Duration(cfg.Timeout) * time.Second,
		},
	}
}

// Generate sends a generation request to the FastAPI server
func (ac *APIClient) Generate(prompt string, contextStr string) (*GenerateResponse, error) {
	reqBody := GenerateRequest{
		Prompt:  prompt,
		Context: contextStr,
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(ac.config.Timeout)*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "POST", ac.config.APIEndpoint, bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")

	resp, err := ac.client.Do(req)
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

	var response GenerateResponse
	if err := json.Unmarshal(body, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	if response.Error != "" {
		return nil, fmt.Errorf("server error: %s", response.Error)
	}

	return &response, nil
}

// HealthCheck checks if the server is reachable
func (ac *APIClient) HealthCheck() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	req, err := http.NewRequestWithContext(ctx, "GET", ac.config.ServerURL+":"+ac.config.ServerPort+"/health", nil)
	if err != nil {
		return fmt.Errorf("failed to create health check request: %w", err)
	}

	resp, err := ac.client.Do(req)
	if err != nil {
		return fmt.Errorf("health check failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("server health check returned status %d", resp.StatusCode)
	}

	return nil
} 