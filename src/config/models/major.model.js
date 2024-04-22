const mongoose = require('mongoose');
const { Schema } = mongoose;

const major =  Schema({
    _id: Schema.Types.ObjectId,
    majorId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, 
    {
    timestamps: true,
    }
);
const Major = mongoose.model('Major', major);
module.exports = Major;