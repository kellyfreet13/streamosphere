// user_handler.go

package api

import (
    "log"
    "context"
    "net/http"

    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"

    "github.com/gin-gonic/gin"
)

type User struct {
    ID          primitive.ObjectID  `bson:"_id,omitempty" json:"id"`
    FirstName   string              `bson:"FirstName,omitempty"`
    LastName    string              `bson:"LastName,omitempty"`
    Email       string              `bson:"Email,omitempty"`
}

// get all users
func GetUsers(c *gin.Context) {
    client := GetMongoClient()
    user_coll := client.Database("streamosphere").Collection("users")

    cursor, err := user_coll.Find(context.Background(), bson.D{})
    if err != nil { c.AbortWithError(400, err) }

    var users []*User
    defer cursor.Close(context.Background())
    for cursor.Next(context.Background()) {
        var user_json User
        if err := cursor.Decode(&user_json); err != nil {
            log.Fatal(err)
        }
        users = append(users, &user_json)
    }

    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, users)
}
