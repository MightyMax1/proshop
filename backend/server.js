const express = require('express')

const Products = require('./data/products')

const app = express()

app.get('/', (req, res) => {
    res.send('msg from server');
})

app.get('/products', (req, res) => {
    res.json(Products);
})

app.get('/products/:id', (req, res) => {
    const product = Products.find(p => p._id == req.params.id)
    res.json(product);
})

const PORT = 5000 || process.env.PORT

app.listen(PORT, console.log('server run on port 5000'))