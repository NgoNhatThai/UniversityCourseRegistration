const mongoose = require('mongoose');
const { Schema } = mongoose;

const studyStatus =  Schema({
    _id: Schema.Types.ObjectId,
    studentId: {
        type: Number,
    },
    studiedCourses: {
        type: Array,
        default: [],
    },
    currentCourses: {
        type: Array,
        default: [],
    },
    failedCourses: {
        type: Array,
        default: [],
    },
    GPA: {
        type: Number,
        default: 0,
    },
    credits: Number,
    status: {
        type: Boolean,
        default: true,
    },
})
const StudyStatus = mongoose.model('StudyStatus', studyStatus);
module.exports = StudyStatus;
