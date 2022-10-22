package firebase

import (
	"encoding/json"
	"errors"

	"github.com/oklog/ulid/v2"
	"org.aygsaba.com/src/datastore"
	"org.aygsaba.com/src/model"
)

type firebaseAuthRepository struct {
	store datastore.Store
}

// NewFirebaseAuthRepository uses firebase auth
// as primary authentication.
func NewFirebaseAuthRepository(s datastore.Store) *firebaseAuthRepository {
	return &firebaseAuthRepository{
		store: s,
	}
}

func (f *firebaseAuthRepository) Signup(auth *model.Auth) error {
	if auth == nil {
		return errors.New("firebase repository: Signup: auth request is required")
	}

	if auth.ID == "" || len(auth.ID) <= 0 {
		id := ulid.Make()
		auth.ID = id.String()
	}

	val, err := json.Marshal(&auth)
	if err != nil {
		return err
	}

	return f.store.Set(auth.ID, val, 0)
}

func (f *firebaseAuthRepository) Login(emailAddress, password string) (model.Auth, error) {
	emptyAuth := model.Auth{}
	if (emailAddress == "" || len(emailAddress) <= 0) && (password == "" || len(password) <= 0) {
		return emptyAuth, errors.New("firebase repository: Login: email address and password are required")
	}

	item, err := f.store.Get(emailAddress)
	if err != nil {
		return emptyAuth, err
	}

	var account model.Auth
	if err := json.Unmarshal(item, &account); err != nil {
		return emptyAuth, err
	}

	return account, nil
}
