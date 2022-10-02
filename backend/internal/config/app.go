package config

// AppConfig represents the
// application specific
// configuration.
// i.e host, port, version, etc..
type AppConfig struct {
	Host       string `toml:"host"`
	Port       int    `toml:"port"`
	APIVersion string `toml:"api_version"`
}