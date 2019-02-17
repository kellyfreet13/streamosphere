package api

import (
	"fmt"
	"net/http"
)

// Defines the API handles for server.
func CreateApiHandler() *http.ServeMux {
	// ServeMux: ' It matches the URL of each incoming request against a list of 
	// registered patterns and calls the handler for the pattern that most closely matches the URL.'
	mux := http.NewServeMux()
	
	// Returns the response to a request to '/' on the host name i.e streamosphere.net/ or streamosphere.net
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello Secure World")
	})

	// Returns the response to a request to '/login' on the host name i.e streamosphere.net/ or streamosphere.net
	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello Secure Login")
	})

	return mux
}