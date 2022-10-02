package api

import (
	"fmt"

	"org.aygsaba.com/internal/config"
)

// Start the application.
// This serves as the
// bootup point of the app.
func Start(configFile *config.Config) error {
	fmt.Println("Application Config: ", configFile)

	return nil
}