package inmemory

import (
	"errors"
	"sync"
	"time"

	"org.aygsaba.com/src/datastore"
)

const storeType = "inmemory"

// InmemoryStore is a struct that implements the `Store` interface.
// The data is saved in a memory.
type InmemoryStore struct {
	mutex sync.RWMutex
	store map[string]*Entry
}

func NewInmemoryStore() datastore.Store {
	return &InmemoryStore{
		store: make(map[string]*Entry),
		mutex: sync.RWMutex{},
	}
}

// Get the value for a given key.
// `nil, nil` is returned when the key does not exist
func (is *InmemoryStore) Get(key string) ([]byte, error) {
	if len(key) == 0 {
		return nil, nil
	}

	is.mutex.RLock()
	defer is.mutex.RUnlock()

	if entry, ok := is.store[key]; ok {
		return entry.Data, nil
	}
	return nil, errors.New("inmemory store: (get) item not found")
}

// Set a given value from a given key along
// with an expiration value, 0 means no expiration.
// Empty key or value will be ignored without an error.
func (is *InmemoryStore) Set(key string, val []byte, exp time.Duration) error {
	if len(key) == 0 || val == nil {
		return nil
	}

	is.mutex.Lock()
	defer is.mutex.Unlock()

	is.store[key] = &Entry{Data: val}

	return nil
}

// Delete the value for a given key.
// It returns no error if the storage does not contain the key,
func (is *InmemoryStore) Delete(key string) error {
	is.mutex.Lock()
	defer is.mutex.Unlock()

	delete(is.store, key)
	return nil
}

// Reset resets the storage and delete all keys.
func (is *InmemoryStore) Reset() error {
	is.mutex.Lock()
	defer is.mutex.Unlock()

	is.store = make(map[string]*Entry)
	return nil
}

// Close closes the storage and will stop any running garbage
// collectors and open connections.
func (is *InmemoryStore) Close() error {
	return nil
}

func (is *InmemoryStore) Type() string {
	return storeType
}
