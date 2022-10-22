package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"org.aygsaba.com/src/api/router"
)

const (
	authGroup   = "/auth"
	healthCheck = "/health"
)

// Initialize serves as an entry point
// to all of the application routes.
// All app route registration goes here.
func (h *Handler) Initialize(r *router.AppRouter) {
	r.GET(healthCheck, func(c echo.Context) error {
		return c.JSON(http.StatusOK, "OK")
	}).Name = "health-check"

}
