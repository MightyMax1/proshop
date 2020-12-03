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

//mongoose pre save action - hash password when creating new user
userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
