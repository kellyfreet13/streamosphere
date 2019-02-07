package internal

import (
	"crypto/tls"
	"net/http"
	"golang.org/x/crypto/acme/autocert"
)

type SecureRequest struct {
	handler *http.ServeMux
}

func (sr SecureRequest) Secure() {
	// certManager gets the CA certificate and key for TLS handshake.
	// TODO(anthonyasanchez): Add certs folder to a config.
	certManager := autocert.Manager{
		Prompt: autocert.AcceptTOS,
		Cache:  autocert.DirCache("../../../certs"),
	}
	// http Server that uses address of ':8443' which is for https request, the handler defines api endpoints.
	server := &http.Server{
		Addr:    ":8443",
		Handler: sr.handler,
		TLSConfig: &tls.Config{
			GetCertificate: certManager.GetCertificate,
		},
	}
	// The http server is listening to port 8080 for http request and will send an invalid response.
	// TODO(anthonyasanchez): Redirect http traffic to https by changing the HTTPHandler.
	go http.ListenAndServe(":8080", certManager.HTTPHandler(nil))
	// Will by default use the TLSConfig in the construction of the server above.
	server.ListenAndServeTLS("", "")
}
