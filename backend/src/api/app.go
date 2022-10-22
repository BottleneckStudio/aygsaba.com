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
	firestore "org.aygsaba.com/src/datastore/firebase"
	"org.aygsaba.com/src/datastore/sqlite3"
	"org.aygsaba.com/src/http/server"
	"org.aygsaba.com/src/repository/firebase"
)

var ctx = context.Background()

// TODO!! add firebase config in the config file
// instead adding here.
const firebaseConfig = ``

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

	sqliteStore, err := sqlite3.NewStore(*conf)
	if err != nil {
		return err
	}
	defer sqliteStore.Close()

	firebaseStore, err := firestore.NewFirebaseStore(firebaseConfig)
	if err != nil {
		log.Fatalln("Cannot start firebase store: ", err)
		os.Exit(-1) // kill the app
	}

	firebaseAuthRepo := firebase.NewFirebaseAuthRepository(firebaseStore)
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
