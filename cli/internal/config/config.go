package config

import (
	"os"
	"strconv"
)

// Config holds all configuration for the application
type Config struct {
	ServerURL string
	ServerPort string
	APIEndpoint string
	Timeout    int
	Debug      bool
}

// Load loads configuration from environment variables with defaults
func Load() *Config {
	cfg := &Config{
		ServerURL:   getEnv("HADES_SERVER_URL", "http://localhost"),
		ServerPort:  getEnv("HADES_SERVER_PORT", "8080"),
		APIEndpoint: getEnv("HADES_API_ENDPOINT", "/api/v1/generate"),
		Timeout:     getEnvAsInt("HADES_TIMEOUT", 30),
		Debug:       getEnvAsBool("HADES_DEBUG", false),
	}

	// Construct full API URL
	cfg.APIEndpoint = cfg.ServerURL + ":" + cfg.ServerPort + cfg.APIEndpoint

	return cfg
}

// getEnv gets an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getEnvAsInt gets an environment variable as integer or returns a default value
func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

// getEnvAsBool gets an environment variable as boolean or returns a default value
func getEnvAsBool(key string, defaultValue bool) bool {
	if value := os.Getenv(key); value != "" {
		if boolValue, err := strconv.ParseBool(value); err == nil {
			return boolValue
		}
	}
	return defaultValue
} 