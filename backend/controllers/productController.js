import asyncHandler from 'express-async-handler'
import Products from '../models/productModel.js'
import mongoose from 'mongoose'

// @desc .... Fetch all products
// @route ... GET /api/products
// @access .. Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Products.find({})
    res.json(products);
})


// @desc .... Fetch single product
// @route ... GET /api/products/:id
// @access .. Public
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


// @desc .... delete product by id
// @route ... DELETE /api/products/:id
// @access .. Pricate/Admin
const deleteProductById = asyncHandler(async (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(406)
        throw new Error('product ID is not valid')
    }

    const product = await Products.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ massage: 'product deleted successfully' })
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})

// @desc .... Create Product 
// @route ... POST /api/products
// @access .. Pricate/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Products({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'sample brand',
        category: ' sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc .... update Product 
// @route ... PUT /api/products/:id
// @access .. Pricate/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    console.log('req.params:', req.params)
    const product = await Products.findById(req.params.id)
    console.log('product 1:', product)

    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.image = image || product.image
        product.brand = brand || product.brand
        product.countInStock = countInStock || product.countInStock

        console.log('product 2:', product)
        const updatedProduct = await product.save()
        console.log('updatedProduct:', updatedProduct)
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('product not found')
    }

})


export {
    getProductById,
    getProducts,
    deleteProductById,
    createProduct,
    updateProduct
}