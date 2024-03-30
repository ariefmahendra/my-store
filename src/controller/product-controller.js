import productService from "../service/product-service.js"


//todo: create product controller
const createProduct = async (req, res, next) => {
    try {
        const productResponse = await productService.createProduct(req.body)
        res.status(201).json({
            message: "created",
            data: productResponse
        })
    } catch (error) {
        next(error)
    }
}

//todo: get product by id controller
const getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id)
        res.status(200).json({
            message: "success",
            data: product
        })
    } catch (error) {
        next(error)
    }
}

//todo: get all product controller
const getProduct = async (req, res, next) => {
    try {
        const products = await productService.getProduct()
        res.status(200).json({
            message: "success",
            data: products
        })
    } catch (error) {
        next(error)
    }
}

//todo: update product controller
const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await productService.updateProduct(req.body)
        res.status(200).json({
            message: "success",
            data: updatedProduct
        })
    } catch (error) {
        next(error)
    }
}

//todo: delete product controller
const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id
        const product = await productService.deleteProduct(id)
        res.status(200).json({
            message: "success",
            data: product
        })
    } catch (error) {
        next(error)
    }
}

export default {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById
}