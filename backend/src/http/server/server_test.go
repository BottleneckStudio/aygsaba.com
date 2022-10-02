package server_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"org.aygsaba.com/http/server"
)

func TestNewServer(t *testing.T) {
	server := server.New()

	assert.NotNil(t, server)
}

func TestServerSettings(t *testing.T) {
	const expectedAddr = "0.0.0.0:8888"
	server := server.New(
		server.WithAddress("0.0.0.0:8888"),
	)

	assert.NotNil(t, server)
	assert.Equal(t, expectedAddr, server.Addr)
}