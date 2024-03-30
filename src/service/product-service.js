import productRepository from "../repository/product-repository.js"
import {ObjectId} from "mongodb";
import {createProductValidation, updateProductValidation} from "../validation/product-validation.js";
import {validate} from "../validation/validation.js";
import {ResponseError} from "../error/response-error.js";
import e from "express";

//todo: create product service
const createProduct = async (payload) => {
    payload = validate(createProductValidation, payload)

    try {
        const result = await productRepository.insert(payload)
        return {
            id: result,
            name: payload.name,
            price: payload.price,
            description: payload.description,
            quantity: payload.quantity
        }
    } catch (error) {
        throw new ResponseError(500, error.message)
    }
}

//todo: get product by id service
const getProductById = async (id) => {
    try {
        const productId = new ObjectId(id)
        const productResponse = await productRepository.findById(productId)

        if (productResponse === null) {
            throw new ResponseError(404, "product not found")
        }

        return {
            id : productResponse._id.toString(),
            name: productResponse.name,
            price: productResponse.price,
            description: productResponse.description,
            quantity: productResponse.quantity
        }
    } catch (error) {
        if (error instanceof ResponseError) {
            throw error;
        }

        throw new ResponseError(500, error.message);
    }
}

//todo: get all product service
const getProduct = async () => {
    try {
        const productsList = await productRepository.findAll()

        if (!Array.isArray(productsList)) {
            throw new Error("productsList is not an array");
        }

        let products = []
        productsList.forEach((item) => {
            const product = {
                id: item._id.toString(),
                name: item.name,
                price: item.price,
                description: item.description,
                quantity: item.quantity
            }
            products.push(product)
        });

        return products
    } catch (error) {
        throw new ResponseError(500, "internal server error")
    }
}

//todo: update product service
const updateProduct = async (payload) => {
    payload = validate(updateProductValidation, payload)
    payload.id = new ObjectId(payload.id)

    try {
        const productUpdated = await productRepository.updateById(payload)
        if (productUpdated.modifiedCount === 0) {
            throw new ResponseError(500, "failed to update product")
        }
        return {
            id: payload.id.toString(),
            name: payload.name,
            price: payload.price,
            description: payload.description,
            quantity: payload.quantity
        }
    } catch (error) {
        throw error
    }
}

//todo: delete product service
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await productRepository.deleteById(new ObjectId(id))
        if (deletedProduct === null){
            throw new ResponseError(404, "product not found")
        }
    } catch (error) {
        throw error
    }
}

export default {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    getProductById
}