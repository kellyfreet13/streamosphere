package security

import (
	"crypto/tls"
	"net/http"
	"golang.org/x/crypto/acme/autocert"
)

// Adds TLS to the server by adding TLSConfig 
// @Params
// server: server to accept traffic.
// @Returns
// certManager: Certification Manager to use when server is started.
func SecureHTTPS(server *http.Server) (certManager autocert.Manager){
	// certManager gets the CA certificate and key for TLS handshake.
	// TODO(anthonyasanchez): Add certs folder to a config.
	certManager = autocert.Manager{
		Prompt: autocert.AcceptTOS,
		Cache:  autocert.DirCache("../../../../certs"),
	}
	
	// Use the TSL config from autocert api.
	server.TLSConfig = &tls.Config{
			GetCertificate: certManager.GetCertificate, 
	}

	return certManager
}
