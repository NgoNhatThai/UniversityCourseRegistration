const mongoose = require('mongoose');
const { Schema } = mongoose;

const course =  Schema({
    _id: Schema.Types.ObjectId,
    courseId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    major: {
        type: Schema.Types.ObjectId,
        ref: 'Major',
    },
    credit: {
        type: Number,
        required: true,
    },
    prerequisiteCourse: {
        type: Array,
        default: null,
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
const Course = mongoose.model('Course', course);
module.exports = Course;