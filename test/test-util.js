import {MongoClient, ObjectId} from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url)

const db = client.db("my_store")

export const removeAllProductTest = async () => {
    await client.connect()
    return await db.collection("products")
        .deleteMany({})
}

export const createProductTest = async () => {
    await client.connect()
    return await db.collection("products")
        .insertOne({
            name: "test",
            price: 100,
            description: "test",
            quantity: 100
        })
        .then((data) => data.insertedId)
}

export const getListProduct = async () => {
    await client.connect()
    return await db.collection("products").find().toArray()
}

export const createManyProductTest = async () => {
    await client.connect()
    return await db.collection("products")
        .insertMany([
            {
                name: "test1",
                price: 100,
                description: "test1",
                quantity: 100
            },
            {
                name: "test2",
                price: 100,
                description: "test2",
                quantity: 100
            },
            {
                name: "test3",
                price: 100,
                description: "test3",
                quantity: 100
            },
            {
                name: "test4",
                price: 100,
                description: "test4",
                quantity: 100
            }
        ])
        .then((data) => data.insertedIds)
}