package config

// AppDatabase represents the
// database configuration.
type AppDatabase struct {
	Dialect string `toml:"dialect"`
	DSN     string `toml:"dsn"`
}