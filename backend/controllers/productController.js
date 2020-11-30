import asyncHandler from 'express-async-handler'
import Products from '../models/productModel.js'
import mongoose from 'mongoose'

const getProducts = asyncHandler(async (req, res) => {
    const products = await Products.find({})
    res.json(products);
})

const getProductById = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(406)
        throw new Error('product ID is not valid')
    }

    const product = await Products.findById(req.params.id)

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})

export {
    getProductById,
    getProducts
}