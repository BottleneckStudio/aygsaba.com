package repository

import (
	"encoding/json"
	"fmt"

	"org.aygsaba.com/src/datastore"
	"org.aygsaba.com/src/model"
)

// Authorizer ...
type Authorizer interface {
	Signup(*model.Auth) error
	Login(string, string) (model.Auth, error)
}

// authRepository implements
// store interface.
type authRepository struct {
	store datastore.Store
}

func NewAuth(store datastore.Store) Authorizer {
	return &authRepository{
		store,
	}
}

// Signup ...
func (ar *authRepository) Signup(auth *model.Auth) error {
	val, err := json.Marshal(auth)
	if err != nil {
		return err
	}

	key := fmt.Sprintf("%s-%s", auth.EmailAddress, auth.Password)
	return ar.store.Set(key, val, 0)
}

// Login ...
func (ar *authRepository) Login(emailAddress, password string) (model.Auth, error) {
	key := fmt.Sprintf("%s-%s", emailAddress, password)
	item, err := ar.store.Get(key)
	if err != nil {
		return model.Auth{}, err
	}

	var account model.Auth
	if err = json.Unmarshal(item, &account); err != nil {
		return model.Auth{}, err
	}

	return account, nil
}
