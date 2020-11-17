import mongoose from 'mongoose'

const mongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log(`db connected. host: ${conn.connection.host} | db name:${conn.connection.name}`)
    } catch (error) {
        console.error(`ERROR:${error.message}`)
        process.exit(1)
    }
}

export default mongoDB;