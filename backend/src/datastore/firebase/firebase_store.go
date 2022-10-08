package firebase

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"google.golang.org/api/option"
	"org.aygsaba.com/src/datastore"
)

const (
	ctxTimeout = 10 * time.Second
	storeType  = "firebase_store"
)

var ctx = context.Background()

// FirebaseStore is a struct that implements the `Store` interface.
// The data is saved in firebase's User pool.
// We don't user firestore in this case.
type FirebaseStore struct {
	firebaseCtx    context.Context
	firebaseApp    *firebase.App
	firebaseClient *auth.Client
}

// NewFirebaseStore
func NewFirebaseStore(configJSON string) (datastore.Store, error) {
	firebaseOpt := option.WithCredentialsJSON([]byte(configJSON))
	ctxWithTimeout, cancelFn := context.WithTimeout(ctx, ctxTimeout)
	defer cancelFn()

	app, err := firebase.NewApp(ctxWithTimeout, nil, firebaseOpt)
	if err != nil {
		return nil, err
	}

	client, err := app.Auth(ctxWithTimeout)
	if err != nil {
		return nil, err
	}

	return &FirebaseStore{
		firebaseCtx:    ctx,
		firebaseApp:    app,
		firebaseClient: client,
	}, nil
}

// Get the value for a given key.
// `nil, nil` is returned when the key does not exist
func (fs *FirebaseStore) Get(key string) ([]byte, error) {
	// by default we use uid to get user
	// this case `key` is the uid.
	fetchedUser := &auth.UserRecord{}

	fetchedUser, err := fs.firebaseClient.GetUser(fs.firebaseCtx, key)
	if err != nil {
		if auth.IsUserNotFound(err) {
			// this time, `key` would be the user's email address.
			fetchedUser, err = fs.firebaseClient.GetUserByEmail(fs.firebaseCtx, key)
			if err != nil {
				return nil, err
			}
		}
		return nil, err
	}

	userByte, err := json.Marshal(&fetchedUser)
	if err != nil {
		return nil, err
	}

	return userByte, nil
}

// Set a given value from a given key along
// with an expiration value, 0 means no expiration.
// Empty key or value will be ignored without an error.
func (fs *FirebaseStore) Set(key string, val []byte, exp time.Duration) error {
	userToCreate := new(auth.UserToCreate)

	// set the key
	if key != "" || len(key) > 0 {
		userToCreate.UID(key)
	}

	if err := json.Unmarshal(val, &userToCreate); err != nil {
		return err
	}

	_, err := fs.firebaseClient.CreateUser(fs.firebaseCtx, userToCreate)
	if err != nil {
		return err
	}

	return nil
}

// Delete the value for a given key.
// It returns no error if the storage does not contain the key,
func (fs *FirebaseStore) Delete(key string) error {
	if key == "" || len(key) <= 0 {
		return errors.New("key empty")
	}

	return fs.firebaseClient.DeleteUser(fs.firebaseCtx, key)
}

// Reset resets the storage and delete all keys.
func (fs *FirebaseStore) Reset() error {
	return nil
}

// Close closes the storage and will stop any running garbage
// collectors and open connections.
func (fs *FirebaseStore) Close() error {
	return nil
}

func (fs *FirebaseStore) Type() string {
	return storeType
}
