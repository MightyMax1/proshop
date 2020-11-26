import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddelware.js'
import ProductRouter from './routes/productRoutes.js'

dotenv.config()
connectDB()
const app = express()



app.use('/api/products', ProductRouter)

app.get('/', (req, res) => {
    res.send('msg from server');
})

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server environment ${process.env.NODE_ENV} on port ${PORT}`))