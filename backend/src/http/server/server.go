package server

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"
)

// Server represents
// the application server.
type Server struct {
	*http.Server
}

// New returns a *Server configuration
func New(opts ...Option) *Server {
	srv := &http.Server{
		Handler:      http.DefaultServeMux,
		Addr:         defaultServerAddr,
		TLSConfig:    getDefaultTLSConfig(),
		IdleTimeout:  defaultServerIdleTimeout,
		ReadTimeout:  defaultServerReadTimeout,
		WriteTimeout: defaultServerWriteTimeout,
	}

	defaultServer := &Server{
		srv,
	}

	for _, opt := range opts {
		opt(defaultServer)
	}

	return defaultServer
}

// Start the app.
// Returns an error
// if an error occured.
func (s *Server) Start() error {
	err := s.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		return err
	}

	return nil
}

// Stop the server
// returns an error, otherwise.
func (s *Server) Stop(ctx context.Context) error {
	shutdownCtx, cancelCtx := context.WithTimeout(ctx, 6*time.Second)
	defer cancelCtx()

	go func() {
		<-shutdownCtx.Done()
		if shutdownCtx.Err() == context.DeadlineExceeded {
			log.Println("graceful shutdown timed-out, exiting")
			os.Exit(-1) // kill the app
		}
	}()

	// graceful shutdown
	if err := s.Shutdown(shutdownCtx); err != nil {
		return err
	}

	return nil
}
