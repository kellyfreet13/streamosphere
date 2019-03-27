// db.go

package api

import (
    "context"
    "log"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"

)

func GetMongoClient() *mongo.Client{
    // connect to mongo and test connection
    client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
    err = client.Ping(context.TODO(), nil)
    if err != nil { log.Fatal(err); log.Fatal("[InitMongoClient()] issue"); }

    return client
}
