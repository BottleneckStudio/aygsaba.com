package inmemory_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"org.aygsaba.com/src/datastore/inmemory"
)

func TestNewInmemoryStore(t *testing.T) {
	store := inmemory.NewInmemoryStore()
	name := store.Type()

	assert.NotNil(t, store)
	assert.NotEmpty(t, name)
	assert.Equal(t, "inmemory", name)
}

func TestInmemoryStoreOperations(t *testing.T) {
	store := inmemory.NewInmemoryStore()

	key := "hello-world"

	err := store.Set(key, []byte("world"), 0)
	assert.NoError(t, err)

	err = store.Set("", nil, 0)
	assert.Nil(t, err)

	val, err := store.Get(key)
	assert.NoError(t, err)
	assert.NotNil(t, val)
	assert.Equal(t, []byte("world"), val)

	val, err = store.Get("")
	assert.Nil(t, err)
	assert.Nil(t, val)

	val, err = store.Get("key-not-found")
	assert.Error(t, err)
	assert.Nil(t, val)
	assert.Equal(t, "inmemory store: (get) item not found", err.Error())

	err = store.Delete(key)
	assert.Nil(t, err)

	err = store.Reset()
	assert.Nil(t, err)

	err = store.Close()
	assert.Nil(t, err)
}
