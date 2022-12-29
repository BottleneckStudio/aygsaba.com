package repository

import (
	"context"
	"errors"

	"api.aygsaba.com/generated"
)

var ErrUserIDRequired = errors.New("user ID is required")

// UserRepository allows us to access the CRUD operation.
type UserRepository interface {
	CreateUser(generated.User) (generated.User, error)
	GetUserByID(id []byte) (generated.User, error)
	GetAllUsers() ([]generated.User, error)
}

type userRepository struct {
	Tx  *generated.Queries
	Ctx context.Context
}

func NewUserRepository(tx *generated.Queries) UserRepository {
	return &userRepository{
		Tx:  tx,
		Ctx: context.Background(),
	}
}

// CreateUser creates a given user.
func (repo *userRepository) CreateUser(user generated.User) (generated.User, error) {
	arg := generated.CreateUserParams{
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

func (repo *userRepository) GetUserByID(id []byte) (generated.User, error) {
	if id == nil {
		return generated.User{}, ErrUserIDRequired
	}

	foundUser, err := repo.Tx.GetUser(repo.Ctx, id)
	if err != nil {
		return foundUser, err
	}

	return foundUser, nil
}

func (repo *userRepository) GetAllUsers() ([]generated.User, error) {
	users, err := repo.Tx.ListUsers(repo.Ctx)
	if err != nil {
		return nil, err
	}

	return users, nil
}
