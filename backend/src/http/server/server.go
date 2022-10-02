package server

import "net/http"

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
