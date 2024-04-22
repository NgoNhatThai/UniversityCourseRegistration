const Course = require('../models/course.model');

const getAllCourses = async () => {
    try {
        const courses = await Course.find();
        if (courses)
            return {
                errCode: 0,
                message: 'Get all courses successfully',
                data: courses,
            }
    } catch (error) {
        return {
            errCode: 1,
            message: 'Get all courses failed',
        }
    }
}
const getCourseByMajor = async (id) => {
    try {
        const courses = await Course.find({ major: id });
        if (courses)
            return {
                errCode: 0,
                message: 'Get all courses successfully',
                data: courses,
            }
    } catch (error) {
        return {
            errCode: 1,
            message: 'Get all courses failed',
        }
    }
}

module.exports = {
    getAllCourses,
    getCourseByMajor,
}