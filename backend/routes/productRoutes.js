import express from 'express'
import asyncHandler from 'express-async-handler'
import Products from '../models/productModel.js'
import mongoose from 'mongoose'


const Router = express.Router()


Router.get('/', asyncHandler(async (req, res) => {
    const products = await Products.find({})
    res.json(products);
}))

Router.get('/:id', asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(406).json({ msg: 'product ID is not valid' })
    }

    const product = await Products.findById(req.params.id)

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ msg: ' product not found' })
    }
}))

export default Router