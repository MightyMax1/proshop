import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

//arrow function not working her
//because "this" in the arrow function point to the parent object and there is no parent object or function there
userSchema.methods.matchPassword = async function (enteredPassword) {
    //this.password - will work becouse
    // we call matchPassword() on specific user
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
