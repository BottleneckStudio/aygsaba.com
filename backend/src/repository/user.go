package repository

import (
	"context"
	"errors"

	db "api.aygsaba.com/internal/generated"
)

var ErrUserIDRequired = errors.New("user ID is required")

// UserRepository allows us to access the CRUD operation.
type UserRepository interface {
	CreateUser(db.User) (db.User, error)
	GetUserByID(id []byte) (db.User, error)
	GetAllUsers() ([]db.User, error)
}

type userRepository struct {
	Tx  *db.Queries
	Ctx context.Context
}

func NewUserRepository(tx *db.Queries) UserRepository {
	return &userRepository{
		Tx:  tx,
		Ctx: context.Background(),
	}
}

// CreateUser creates a given user.
func (repo *userRepository) CreateUser(user db.User) (db.User, error) {
	arg := db.CreateUserParams{
		ID:        user.ID,
		Email:     user.Email,
		CreatedAt: user.CreatedAt,
	}

	createdUser, err := repo.Tx.CreateUser(repo.Ctx, arg)
	if err != nil {
		return createdUser, err
	}

	return createdUser, nil
}

func (repo *userRepository) GetUserByID(id []byte) (db.User, error) {
	if id == nil {
		return db.User{}, ErrUserIDRequired
	}

	foundUser, err := repo.Tx.GetUser(repo.Ctx, id)
	if err != nil {
		return foundUser, err
	}

	return foundUser, nil
}

func (repo *userRepository) GetAllUsers() ([]db.User, error) {
	users, err := repo.Tx.ListUsers(repo.Ctx)
	if err != nil {
		return nil, err
	}

	return users, nil
}
