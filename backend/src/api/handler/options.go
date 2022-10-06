package handler

import "org.aygsaba.com/src/repository"

// HandlerOptions custom
// function that sets
// different handler options.
type HandlerOptions func(*Handler)

func WithAuthRepository(ar repository.Authorizer) HandlerOptions {
	return func(h *Handler) {
		h.authRepository = ar
	}
}
