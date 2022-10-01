package server

import (
	"crypto/tls"
	"net/http"
	"time"
)


// Option type is a custom
// type that accepts a *Server
// inorder for it to be
// configurable.
type Option func(*Server)

const (
	defaultServerIdleTimeout  = 12 * time.Second
	defaultServerReadTimeout  = 12 * time.Second
	defaultServerWriteTimeout = 12 * time.Second
	defaultServerAddr         = "0.0.0.0:8888"
)

// WithHandler accepts an implementation to
// http.Handler interface. This sets
// the handler needed for this server.
func WithHandler(handler http.Handler) Option {
	return func(s *Server) {
		s.Handler = handler
	}
}

// WithAddress accepts an addr string
// to use for the app address.
// Default: 0.0.0.0:8888
func WithAddress(addr string) Option {
	return func(s *Server) {
		s.Addr = addr
	}
}

// WithTLSConfig accepts a *tls.Config
// if we want to support tls connection.
func WithTLSConfig(config *tls.Config) Option {
	return func(s *Server) {
		s.TLSConfig = config
	}
}

func getDefaultTLSConfig() *tls.Config {
	tlsConfig := &tls.Config{
		// Causes servers to use Go's default ciphersuite preferences,
		// which are tuned to avoid attacks. Does nothing on clients.
		PreferServerCipherSuites: true,
		// Only use curves which have assembly implementations
		CurvePreferences: []tls.CurveID{
			tls.CurveP256,
			tls.X25519, // Go 1.8 only
		},
		MinVersion: tls.VersionTLS12,
		CipherSuites: []uint16{
			tls.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384,
			tls.TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305, // Go 1.8 only
			tls.TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305,   // Go 1.8 only
			tls.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256,
			tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,
		},
	}

	return tlsConfig
}