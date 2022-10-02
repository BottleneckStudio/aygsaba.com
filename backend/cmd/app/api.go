package main

import (
	"flag"
	"log"

	"org.aygsaba.com/internal/config"
	"org.aygsaba.com/src/api"
)

const AppVersion = "0.0.0"

var flagConfig = flag.String("config", "./config/local.toml", "Path to config file. Default: local")

func main() {
	flag.Parse()

	cfg, err := config.Load(*flagConfig)
	if err != nil {
		log.Fatal(err)
	}

	// start the app
	if err := api.Start(&cfg); err != nil {
		log.Fatal(err)
	}
}