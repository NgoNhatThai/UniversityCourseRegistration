const mongoose = require('mongoose');
const { Schema } = mongoose;

const student = Schema({
    _id: Schema.Types.ObjectId,
    studentId: {
        type: Number,
        required: true,
        unique: true,
    },
    name: String,
    type: {
        type: String,
        required: true,
        enum: ['undergraduate', 'ulumni'],
    },
    
    avatar: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    major: {
        type: Schema.Types.ObjectId,
        ref: 'Major',
    },
    password: String,
    gender :{
        type: Boolean,
        required: true,
    },
    homeTown: String,
    schoolYear: String,
    educationLevel: {
        type: String,
        enum: ['Đại học', 'Cao đẳng', 'Trung cấp', 'Thạc sĩ', 'Tiến sĩ']
    },
    clazz: {
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
const Student = mongoose.model('Student', student);
module.exports = Student;

