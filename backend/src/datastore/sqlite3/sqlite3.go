package sqlite3

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"org.aygsaba.com/internal/config"
)

var parentCtx = context.Background()

const (
	maxRetryConn      = 5
	dbConnMaxLifetime = 12 * time.Hour
	dbMaxIdleConn     = 6
	dbMaxOpenConn     = 10
	ctxTimeout        = 6 * time.Second
)

// Sqlite3Store ...
type Sqlite3Store struct {
	DBContext context.Context
	DB        *sql.DB
	Query     string
}

// New returns an instance to Sqlite3Store.
// This store also implements the `Storage` interface.
func NewStore(cfg config.Config) (*Sqlite3Store, error) {
	db, err := sql.Open(cfg.Database.Dialect, cfg.Database.DSN)
	if err != nil {
		return nil, err
	}
	ctx, cancelFn := context.WithTimeout(parentCtx, ctxTimeout)
	defer cancelFn()

	ctr := 0
	var dbConnErr error
	for ctr < maxRetryConn {
		if err := db.PingContext(ctx); err != nil {
			dbConnErr = err
			continue
		}
		ctr++
	}

	if dbConnErr != nil {
		return nil, dbConnErr
	}

	db.SetConnMaxLifetime(dbConnMaxLifetime)
	db.SetConnMaxIdleTime(ctxTimeout)
	db.SetMaxIdleConns(dbMaxIdleConn)
	db.SetMaxOpenConns(dbMaxOpenConn)

	log.Println("Successfully connected to Database")

	return &Sqlite3Store{
		DBContext: ctx,
		DB:        db,
	}, nil
}

// Get the value for a given key.
// `nil, nil` is returned when the key does not exist
func (ss *Sqlite3Store) Get(key string) ([]byte, error) {
	if len(key) <= 0 {
		return nil, errors.New("sqlite3: key is missing")
	}
	var (
		data = []byte{}
	)
	queryCtx, err := ss.DB.PrepareContext(ss.DBContext, ss.Query)
	if err != nil {
		return nil, err
	}
	defer queryCtx.Close()

	queryRow := queryCtx.QueryRow(key)
	if err := queryRow.Scan(&data); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return data, nil
}

// Set a given value from a given key along
// with an expiration value, 0 means no expiration.
// Empty key or value will be ignored without an error.
func (ss *Sqlite3Store) Set(key string, value []byte, exp time.Duration) error {
	if len(key) <= 0 || len(value) <= 0 {
		return errors.New("sqlite3: key and value are empty")
	}
	queryCtx, err := ss.DB.PrepareContext(ss.DBContext, ss.Query)
	if err != nil {
		return err
	}
	defer queryCtx.Close()

	_, err = queryCtx.Exec(key, value)
	return err
}

// Delete the value for a given key.
// It returns no error if the storage does not contain the key,
func (ss *Sqlite3Store) Delete(key string) error {
	if len(key) <= 0 {
		return errors.New("sqlite3: key is missing")
	}

	queryCtx, err := ss.DB.PrepareContext(ss.DBContext, ss.Query)
	if err != nil {
		return err
	}
	defer queryCtx.Close()

	_, err = queryCtx.Exec(key)
	return err
}

// Reset resets the storage and delete all keys.
func (ss *Sqlite3Store) Reset() error {
	return nil
}

// Close closes the storage and will stop any running garbage
// collectors and open connections.
func (ss *Sqlite3Store) Close() error {
	return ss.DB.Close()
}

func (ss *Sqlite3Store) Type() string {
	return "sqlite3"
}
