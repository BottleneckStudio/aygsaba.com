package repository

import "api.aygsaba.com/generated"

// UserService an interface from which our API module can access.
type UserService interface {
	InsertUser(generated.User) (generated.User, error)
	RetrieveUser(id []byte) (generated.User, error)
	ListUsers() ([]generated.User, error)
}

type userService struct {
	userRepository UserRepository
}

func NewUserService(repo UserRepository) UserService {
	return &userService{
		userRepository: repo,
	}
}

func (s *userService) InsertUser(user generated.User) (generated.User, error) {
	return s.userRepository.CreateUser(user)
}

func (s *userService) RetrieveUser(id []byte) (generated.User, error) {
	return s.userRepository.GetUserByID(id)
}

func (s *userService) ListUsers() ([]generated.User, error) {
	return s.userRepository.GetAllUsers()
}
