package server

<<<<<<< HEAD:backend/http/server/server.go
import "net/http"
=======
import (
	"net/http"
)
>>>>>>> e5d0e40 (added Makefile and config):backend/src/http/server/server.go

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
