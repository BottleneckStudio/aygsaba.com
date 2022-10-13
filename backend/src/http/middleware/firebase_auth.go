package middleware

import (
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"org.aygsaba.com/src/datastore/firebase"
)

const ctxAuthKey = "auth-token"

func FirebaseAuth(fStore *firebase.FirebaseStore) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			rCtx := fStore.FirebaseCtx
			authClient := fStore.FirebaseClient
			authHeader := c.Request().Header.Get(echo.HeaderAuthorization)

			idToken := strings.TrimSpace(strings.Replace(authHeader, "Bearer", "", 1))
			if idToken == "" || len(idToken) <= 0 {
				return c.JSON(http.StatusUnauthorized, errors.New("missing or invalid auth token"))
			}

			fmt.Println("Bearer Token Passed: ", idToken)
			token, err := authClient.VerifyIDToken(rCtx, idToken)
			if err != nil {
				return c.JSON(http.StatusUnauthorized, err.Error())
			}

			c.Set(ctxAuthKey, token)

			return next(c)
		}
	}
}
