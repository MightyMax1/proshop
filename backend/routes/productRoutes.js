import express from 'express'

import { getProductById, getProducts } from '../controllers/productController.js'

const Router = express.Router()


// Router.route('/').get(getProducts)
// Router.route('/:id').get(getProductById)

Router.get('/', getProducts)


export default Router