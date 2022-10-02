package router

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
)

func New() *echo.Echo {
	engine := echo.New()
	engine.Logger.SetLevel(log.DEBUG)
	engine.Pre(middleware.RemoveTrailingSlash())

	// attach basic middleware
	engine.Use(
		middleware.Logger(),
		middleware.Recover(),
		middleware.RequestID(),
		middleware.Secure(),
		middleware.Gzip(),
	)

	// set cors
	engine.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
	}))

	return engine
}