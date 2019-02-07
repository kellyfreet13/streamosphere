package main

import (
	"fmt"
	"internal/secure_requests"
)

func main() {
	mux := http.NewServeMux()
	// Returns the response to a request to '/' on the host name i.e streamosphere.net/ or streamosphere.net
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello Secure World")
	})

	sec_req = secure_requests.SecureRequest{
		handler: mux
	}
	sec_req.Secure() 
}
