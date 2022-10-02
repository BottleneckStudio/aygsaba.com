package config

import (
	"io/ioutil"

	"github.com/BurntSushi/toml"
	validation "github.com/go-ozzo/ozzo-validation/v4"
)

const (
	defaultServerPort      = 8080
	defaultEnv             = "local"
	defaultDatabase        = "./app.sqlite3"
	defaultDatabaseDialect = "sqlite3"
)

// Config represents the
// application config
// of the application.
type Config struct {
	Env      string      `toml:"env"`
	Debug    bool        `toml:"debug"`
	App      AppConfig   `toml:"app"`
	Database AppDatabase `toml:"database"`
}

// Validate validates the application configuration.
func (c Config) Validate() error {
	return validation.ValidateStruct(&c,
		validation.Field(&c.Env, validation.Required),
		validation.Field(&c.Debug, validation.Required),
		validation.Field(&c.App, validation.Required),
		validation.Field(&c.Database, validation.Required),
	)
}

func Load(cfg string) (Config, error) {
	defaultConfig := Config{
		Env:   defaultEnv,
		Debug: true,
		App: AppConfig{
			Host: "localhost",
			Port: defaultServerPort,
		},
		Database: AppDatabase{
			Dialect: defaultDatabaseDialect,
			DSN:     defaultDatabase,
		},
	}

	byt, err := ioutil.ReadFile(cfg)
	if err != nil {
		return defaultConfig, err
	}

	if err := toml.Unmarshal(byt, &defaultConfig); err != nil {
		return defaultConfig, err
	}

	if err := defaultConfig.Validate(); err != nil {
		return defaultConfig, err
	}

	return defaultConfig, nil
}