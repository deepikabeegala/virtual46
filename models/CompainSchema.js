const mongoose = require('mongoose')

const CompainSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    role:{
        type: String,
        default:"user"
    }
})

module.exports = mongoose.model("Compain",CompainSchema)