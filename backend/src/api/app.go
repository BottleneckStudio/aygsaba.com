package api

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"org.aygsaba.com/internal/config"
	"org.aygsaba.com/src/api/router"
	"org.aygsaba.com/src/http/server"
)

var ctx = context.Background()

// Start the application.
// This serves as the
// bootup point of the app.
func Start(conf *config.Config) error {
	appHandler := router.New()

	// start server
	serverAddr := fmt.Sprintf("%s:%d", conf.App.Host, conf.App.Port)
	srv := server.New(
		server.WithHandler(appHandler),
		server.WithAddress(serverAddr),
	)

	// inject app routes here
	// TODO:::
	// appHandler.Register(r)

	serverCtx, cancel := context.WithTimeout(ctx, 6*time.Second)

	sig := make(chan os.Signal, 1)
	signal.Notify(sig, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

	go func() {
		<-sig

		// send shutdown signal
		log.Println("Shutting down server...")
		_ = srv.Stop(serverCtx)
		cancel()
	}()

	log.Printf("HTTP Server listening on: %s", srv.Addr)
	_ = srv.Start()

	return nil
}