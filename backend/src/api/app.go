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
	appHandler "org.aygsaba.com/src/api/handler"
	appRouter "org.aygsaba.com/src/api/router"
	"org.aygsaba.com/src/datastore/inmemory"
	"org.aygsaba.com/src/http/server"
	"org.aygsaba.com/src/repository/firebase"
)

var ctx = context.Background()

// Start the application.
// This serves as the
// bootup point of the app.
func Start(conf *config.Config) error {
	router := appRouter.New()

	// start server
	serverAddr := fmt.Sprintf("%s:%d", conf.App.Host, conf.App.Port)
	srv := server.New(
		server.WithHandler(router),
		server.WithAddress(serverAddr),
	)

	// TODO:: replace this one
	// with an actual DB.
	memoryStore := inmemory.NewInmemoryStore()
	firebaseAuthRepo := firebase.NewFirebaseAuthRepository(memoryStore)

	handler := appHandler.New(
		appHandler.WithAuthRepository(firebaseAuthRepo),
	)
	handler.Initialize(router)

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
