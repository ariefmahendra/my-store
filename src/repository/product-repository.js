import {MongoClient, ObjectId} from "mongodb"

const url = "mongodb://localhost:27017";
const client = new MongoClient(url)

const db = client.db("my_store")

//todo: create product
const insert = async (product) => {
    try {
        await client.connect()
        return await db.collection("products")
            .insertOne(product)
            .then((data) => data.insertedId)
    } catch (error){
        throw error
    } finally {
        await client.close()
    }
}

//todo: get product by id
const findById = async (id) => {
    try {
        await client.connect()
        return await db.collection("products")
            .findOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw error
    } finally {
        await client.close()
    }
}

//todo: get list product
const findAll = async () => {
    try {
        await client.connect()
       return await db.collection("products")
           .find()
           .toArray()
           .then((data) => data)
    } catch (error) {
        throw error
    } finally {
        await client.close()
    }
}

//todo: update product
const updateById = async (product) => {
    try {
        await client.connect()
        const filter = { _id: product.id }
        const updateDoc = {
            $set: {
                name: product.name,
                price: product.price,
                description: product.description,
                quantity: product.quantity
            },
        }
        return await db.collection("products")
            .updateOne(filter, updateDoc)
    } catch (error) {
        throw error
    }
}

//todo: delete product
const deleteById = async (id) => {
    try {
        await client.connect()
        const query = { _id: id }

        const result =  await db.collection("products")
            .deleteOne(query)

        if (result.deletedCount === 0) {
            return null
        }
        return result
    } finally {
        await client.close()
    }
}

export default {
    insert,
    findAll,
    updateById,
    deleteById,
    findById
}
