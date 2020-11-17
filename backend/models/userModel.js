import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmine: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestemps: true
})


const User = mongoose.model('User', userSchema)

export default User
