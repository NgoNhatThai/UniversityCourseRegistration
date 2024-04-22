const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseRegistration =  Schema({
    // Mã đăng ký (Registration ID)
    // Mã sinh viên (Student ID)
    // Mã lớp học (Class ID)
    // Ngày đăng ký (Registration Date)
    // Tình trạng đăng ký (Registration Status)
    _id: Schema.Types.ObjectId,
    registrationId: {
        type: Number,
        required: true,
        unique: true,
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
    },
    registrationDate: {
        type: Date,
        required: true,
    },
    registrationStatus: {
        type: Boolean,
        default: true,
    },
    
}, 
    {
    timestamps: true,
    }
);

const CourseRegistration = mongoose.model('CourseRegistration', courseRegistration);
module.exports = CourseRegistration;