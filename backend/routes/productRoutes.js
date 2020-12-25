import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
getTopProducts
import { getProductById, getTopProducts, createProductReview, getProducts, deleteProductById, createProduct, updateProduct } from '../controllers/productController.js'

const Router = express.Router()

Router.get('/top', getTopProducts)

Router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

Router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProductById)
    .put(protect, admin, updateProduct)

Router.route('/:id/review').post(protect, createProductReview)




export default Router