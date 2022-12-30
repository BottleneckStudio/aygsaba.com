package repository

import db "api.aygsaba.com/internal/generated"

// UserService an interface from which our API module can access.
type UserService interface {
	InsertUser(db.User) (db.User, error)
	RetrieveUser(id []byte) (db.User, error)
	ListUsers() ([]db.User, error)
}

type userService struct {
	userRepository UserRepository
}

func NewUserService(repo UserRepository) UserService {
	return &userService{
		userRepository: repo,
	}
}

func (s *userService) InsertUser(user db.User) (db.User, error) {
	return s.userRepository.CreateUser(user)
}

func (s *userService) RetrieveUser(id []byte) (db.User, error) {
	return s.userRepository.GetUserByID(id)
}

func (s *userService) ListUsers() ([]db.User, error) {
	return s.userRepository.GetAllUsers()
}
