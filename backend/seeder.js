import mongoose from 'mongoose'
import dotenv from 'dotenv'
import ConnDB from './config/db.js'
import Orders from './models/orderModel.js'
import Products from './models/productModel.js'
import User from './models/userModel.js'
import users from './data/users.js'
import products from './data/products.js'

dotenv.config()
ConnDB()

const ImportData = async () => {
    try {
        await User.deleteMany()
        await Products.deleteMany()
        await Orders.deleteMany()

        const createdUsers = await User.insertMany(users)

        const userAdminID = await createdUsers[0]._id

        const prepareProducts = products.map((product) => {
            return { ...product, user: userAdminID }
        })

        const createdProducts = await Products.insertMany(prepareProducts)

        console.log('data inserted sucesfully')

        process.exit()
    } catch (error) {
        console.error(`ERROR:${error.message}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await User.deleteMany()
        await Products.deleteMany()
        await Orders.deleteMany()

        process.exit()
    } catch (error) {
        console.error(`ERROR:${error.message}`)
        process.exit(1)
    }
}

//process.argv[2] -  the second argument pass in command-line(terminal) 
//npm script - npm run data:import/data:destroy
if (process.argv[2] == 'destroy') {
    destroyData()
} else {
    ImportData()
}