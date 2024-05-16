const mongoose = require('mongoose');
const { Schema } = mongoose;

const clazz =  Schema({
    // Mã lớp học (Class ID)
    // Mã môn học (Course ID)
    // Mã ngành (Major ID)
    // Giảng viên (Instructor)
    // Số sinh viên tối đa (Max Students)
    // Số sinh viên đã đăng ký (Registered Students)
    // Thời gian học (Class Schedule)
    _id: Schema.Types.ObjectId,
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    major: {
        type: Schema.Types.ObjectId,
        ref: 'Major',
    },
    instructor: {
        type: String,
        required: true,
    },
    maxStudents: {
        type: Number,
        required: true,
    },
    waitingStudents: {
        type: Array
    },
    registeredStudents: {
        type: Array,
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
    practiceSchedule: {
        type: Array
    },
    room: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
}, 
    {
    timestamps: true,
    }
);
const Class = mongoose.model('Class', clazz);
module.exports = Class;