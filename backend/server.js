import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddelware.js'

import ProductRouter from './routes/productRoutes.js'
import UserRoutes from './routes/userRoutes.js'
import OrderRouter from './routes/orderRoute.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())//Middleware parse json in body req


app.use('/api/products', ProductRouter)
app.use('/api/users', UserRoutes)
app.use('/api/orders', OrderRouter)

app.use('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})


app.get('/', (req, res) => {
    res.send('msg from server');
})

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server environment ${process.env.NODE_ENV} on port ${PORT}`))