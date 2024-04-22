const mongoose = require('mongoose');
const { Schema } = mongoose;

const certificate = Schema({
    _id: Schema.Types.ObjectId,
    certificateId: {
        type: Number,
        required: true,
        unique: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    issueDate: {
        type: Date,
        required: true,
    },
    GPA: {
        type: Number,
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

const Certificate = mongoose.model('Certificate', certificate);
module.exports = Certificate;