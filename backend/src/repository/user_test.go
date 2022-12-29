package repository_test

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"testing"
	"time"

	"api.aygsaba.com/generated"
	"api.aygsaba.com/src/repository"
	"github.com/google/go-cmp/cmp"
	_ "github.com/mattn/go-sqlite3"
	"github.com/oklog/ulid/v2"
)

const (
	dialect = "sqlite3"
	dsn     = ":memory:"

	createUserTableQuery = `CREATE TABLE IF NOT EXISTS users (
		id BLOB NOT NULL PRIMARY KEY,
		email TEXT NOT NULL,
		avatar TEXT,
		created_at TEXT NOT NULL,
		UNIQUE(email)
	);
`
)

var ErrUserIDRequired = errors.New("user ID is required")

func TestUserService(t *testing.T) {
	ctx := context.Background()

	db, err := sql.Open(dialect, dsn)
	if err != nil {
		t.Error(err)
	}

	if err := setupTable(ctx, db); err != nil {
		t.Fatal(err)
	}

	dbQuery := generated.New(db)
	userRepo := repository.NewUserRepository(dbQuery)
	userSvc := repository.NewUserService(userRepo)

	if userSvc == nil {
		t.Error("service should not be nil")
	}

	testEmail := fmt.Sprintf("rborofeo+%s@gmail.com", time.Now().String())
	testAvatar := sql.NullString{
		String: "https://testimage.com",
		Valid:  true,
	}

	emptyUser := generated.User{}

	validUserArg := generated.User{
		ID:        ulid.Make().Bytes(),
		Email:     testEmail,
		Avatar:    testAvatar,
		CreatedAt: time.Now().String(),
	}

	invalidUserArg := generated.User{
		Email:  "",
		Avatar: sql.NullString{},
	}

	createdUser, err := createUser(userSvc, validUserArg)
	if err != nil {
		t.Error(err)
	}

	if cmp.Equal(createdUser, emptyUser) {
		t.Error(errors.New("createdUser should not be empty"))
	}

	noUserCreated, err := createUser(userSvc, invalidUserArg)
	if err != nil {
		if err.Error() != "NOT NULL constraint failed: users.id" {
			t.Error(err)
		}
	}

	if !cmp.Equal(noUserCreated, emptyUser) {
		t.Error(errors.New("cmp: Users not equal"))
	}

	if _, err := retrieveUser(userSvc, validUserArg.ID); err != nil {
		t.Error(err)
	}

	noUserID, err := retrieveUser(userSvc, nil)
	if err != nil {
		if err.Error() != ErrUserIDRequired.Error() {
			t.Error(err)
		}
	}

	if !cmp.Equal(noUserID, emptyUser) {
		t.Error(errors.New("cmp: Users not equal"))
	}

	noUser, err := retrieveUser(userSvc, ulid.Make().Bytes())
	if err != nil {
		if err.Error() != sql.ErrNoRows.Error() {
			t.Error(err)
		}
	}
	if !cmp.Equal(noUser, emptyUser) {
		t.Error(errors.New("cmp: Users not equal"))
	}
}

func createUser(service repository.UserService, u generated.User) (generated.User, error) {
	insertedUser, err := service.InsertUser(u)
	if err != nil {
		return insertedUser, err
	}
	return insertedUser, nil
}

func retrieveUser(service repository.UserService, id []byte) (generated.User, error) {
	user, err := service.RetrieveUser(id)
	if err != nil {
		return user, err
	}
	return user, nil
}

func setupTable(ctx context.Context, db *sql.DB) error {
	_, err := db.ExecContext(ctx, createUserTableQuery)

	return err
}
