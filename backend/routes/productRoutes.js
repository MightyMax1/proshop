import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProductById, getProducts, deleteProductById, createProduct, updateProduct } from '../controllers/productController.js'

const Router = express.Router()


Router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

Router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProductById)
    .put(protect, admin, updateProduct)



export default Router