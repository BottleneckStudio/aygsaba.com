package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

const (
	authGroup = "/auth"

	healthCheck = "/health"
)

// Initialize serves as an entry point
// to all of the application routes.
// All app route registration goes here.
func (h *Handler) Initialize(r *echo.Echo) {
	r.GET(healthCheck, func(c echo.Context) error {
		return c.JSON(http.StatusOK, "OK")
	}).Name = "health-check"

	authRoutes := r.Group(authGroup)

	authRoutes.POST("/signup", h.AuthSignup).Name = "auth-signup"
	authRoutes.POST("/login", h.AuthLogin).Name = "auth-login"
}