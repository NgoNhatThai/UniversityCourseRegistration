const mongoose = require('mongoose');
const { Schema } = mongoose;

const clazz =  Schema({
    // Mã lớp học (Class ID)
    // Mã môn học (Course ID)
    // Giảng viên (Instructor)
    // Số sinh viên tối đa (Max Students)
    // Số sinh viên đã đăng ký (Registered Students)
    // Thời gian học (Class Schedule)
    _id: Schema.Types.ObjectId,
    classId: {
        type: Number,
        required: true,
        unique: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    major: {
        type: Number,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    maxStudents: {
        type: Number,
        required: true,
    },
    registeredStudents: {
        type: Number,
        required: true,
    },
    classSchedule: {
        type: 
        {
            //From 2 - 7 (Monday - Saturday): Sunday = 8
            weekDay: {
                type: Number,
                required: true,
            },
            //From 1 - 14
            start: {
                type: Number,
                required: true,
            },
            //From 2 - 15
            end: {
                type: Number,
                required: true,
            }
        },
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
}, 
    {
    timestamps: true,
    }
);
const Class = mongoose.model('Class', clazz);
module.exports = Class;