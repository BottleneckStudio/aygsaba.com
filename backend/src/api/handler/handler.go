package handler

// Handler contains
// all handler configuration
// and application handlers.
type Handler struct {
}

// New returns a Handler instance.
func New(opts ...HandlerOptions) *Handler {
	h := &Handler{}
	for _, opt := range opts {
		opt(h)
	}
	return h
}