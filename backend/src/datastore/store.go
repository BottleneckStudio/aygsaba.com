package datastore

import "time"

// Store interface sets different data store implementations.
type Store interface {
	// Get the value for a given key.
	// `nil, nil` is returned when the key does not exist
	Get(string) ([]byte, error)

	// Set a given value from a given key along
	// with an expiration value, 0 means no expiration.
	// Empty key or value will be ignored without an error.
	Set(string, []byte, time.Duration) error

	// Delete the value for a given key.
	// It returns no error if the storage does not contain the key,
	Delete(string) error

	// Reset resets the storage and delete all keys.
	Reset() error

	// Close closes the storage and will stop any running garbage
	// collectors and open connections.
	Close() error

	Type() string
}
