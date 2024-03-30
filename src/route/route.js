import express from "express"
import productController from "../controller/product-controller.js"

const router = express.Router()

router.get("/api/products", productController.getProduct)
router.get("/api/products/:id", productController.getProductById)
router.post("/api/products", productController.createProduct)
router.put("/api/products/:id", productController.updateProduct)
router.delete("/api/products/:id", productController.deleteProduct)

export default router