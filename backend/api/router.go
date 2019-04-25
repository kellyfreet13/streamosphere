package api

import (
//	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
//    cors "github.com/rs/cors/wrapper/gin"
)

var router *gin.Engine

func InitApiHandler() *gin.Engine {
    router = gin.Default()
    // allow api calls essentially
    router.Use(CORSMiddleware())
    initRoutes()
    router.Run(":8080")

    return router
}

func initRoutes(){

    api := router.Group("/api")
    {
        // ------------------------- FILES -------------------------
        api.GET("/files/:FileID", GetSingleFile)
        api.GET("/users/:UserID/files", GetAllFiles)
        api.GET("/users/:UserID/files/:FileType", GetAllFilesByType)

        api.POST("/users/:UserID/files", UploadFile)

        // Handle PATCH to edit any file attribute(s) (except arrays at the moment)
        api.PATCH("/files/:FileID", UpdateFile)

        // ------------------------- USERS -------------------------
        api.GET("/users", GetUsers)
        api.POST("/user", CreateUser)
        api.GET("/user/:Email", GetUserIdByEmail)

        // ----------------------- FOLDERS -------------------------
        api.GET("/users/:UserID/folders", GetAllFolders)
    }

	// Set route for default landing page.
    //router.Use(static.Serve("/", static.LocalFile("../../frontend/src/components/containers/LandingPage.jsx", true)))

	router.GET("/tester", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello secure world",
		})
	})

	// Set route for default landing page.
	//router.GET("/", func(c *gin.Context) {
	//	c.JSON(200, gin.H{
	//		"message": "Hello secure world",
	//	})
	//})

	// Set route for login page.
	router.GET("/login", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "secure login",
		})
	})
}

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}
