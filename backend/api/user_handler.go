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
    ID          primitive.ObjectID  `bson:"_id,omitempty"       json:"id,omitempty"`
    FirstName   string              `bson:"FirstName,omitempty" json:"FirstName,omitempty"`
    LastName    string              `bson:"LastName,omitempty"  json:"LastName,omitempty"`
    Email       string              `bson:"Email,omitempty"     json:"Email,omitempty"`
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

// ex: { "Email": "kelly@sexy.gov" }
func CreateUser(c *gin.Context) {
    client := GetMongoClient()
    user_coll := client.Database("streamosphere").Collection("users")

    // bind json body to struct
    var json_user User
    c.BindJSON(&json_user)

    // insert into db and get result
    res, err := user_coll.InsertOne(context.TODO(), json_user)
    if err != nil { log.Println(err); }

    // return the id created from the db
    c.Header("Content-Type", "application/json")
    c.JSON(http.StatusOK, gin.H {
        "UserID": res.InsertedID,
    })
}
