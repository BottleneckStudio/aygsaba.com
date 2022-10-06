package handler

import "org.aygsaba.com/src/repository"

// Handler contains
// all handler configuration
// and application handlers.
type Handler struct {
	authRepository repository.Authorizer
}

// New returns a Handler instance.
func New(opts ...HandlerOptions) *Handler {
	h := &Handler{}
	for _, opt := range opts {
		opt(h)
	}
	return h
}
