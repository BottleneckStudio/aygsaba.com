package main

import (
	"database/sql"
	"flag"
	"fmt"
	"net/http"
	"os"

	"api.aygsaba.com/generated"
	"api.aygsaba.com/src/repository"
	"github.com/labstack/echo/v4"
	_ "github.com/mattn/go-sqlite3"
)

// addr is the bind address for the web server.
const addr = ":3000"

func main() {
	if err := run(); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func run() error {
	// ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGTERM)
	// defer stop()

	// Parse command line flags.
	dsn := flag.String("dsn", "", "datasource name")
	flag.Parse()
	if *dsn == "" {
		flag.Usage()
		return fmt.Errorf("required: -dsn")
	}

	// Open database file.
	db, err := sql.Open("sqlite3", *dsn)
	if err != nil {
		return err
	}
	defer db.Close()

	e := echo.New()

	e.GET("/users", func(c echo.Context) error {
		dbQuery := generated.New(db)

		userRepo := repository.NewUserRepository(dbQuery)
		userSvc := repository.NewUserService(userRepo)

		users, err := userSvc.ListUsers()
		if err != nil {
			return c.JSON(http.StatusNotFound, "Empty")
		}

		data := map[string]interface{}{
			"data":    users,
			"message": "OK",
		}

		return c.JSON(http.StatusOK, data)
	})

	return e.Start(addr)
}
