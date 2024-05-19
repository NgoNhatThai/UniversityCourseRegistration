import courseService from '../services/course.service';


const addCourse = async (req, res) => {
    const {courseId, name, credit, prerequisiteCourse} = req.body;
    if(!courseId || !name || !credit || !prerequisiteCourse)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.addCourse(courseId, name, credit, prerequisiteCourse);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getAllCourses = async (req, res) => {
    try {
        const response = await courseService.getAllCourses();
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const addClass = async (req, res) => {
    const {courseId, major, instructor, maxStudents, waitingStudents, registeredStudents, classSchedule, practiceSchedule, room, semester} = req.body;
    if(!courseId || !major || !instructor || !maxStudents || !waitingStudents || !registeredStudents || !classSchedule || !room || !semester || !practiceSchedule)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.addClass(courseId, major, instructor, maxStudents, waitingStudents, registeredStudents, classSchedule, practiceSchedule, room, semester);
        return res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
}

const addMajor = async (req, res) => {
    const {majorId, name} = req.body;
    if(!majorId || !name)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});      
    try {
        const response = await courseService.addMajor(majorId, name);
        return res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
}
const getCourceByMajor = async (req, res) => {
    const {major} = req.body;
    if(!major)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.getCourceByMajor(major);
        return res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
}
const getClassByCourse = async (req, res) => {
    const {course} = req.body;
    if(!course)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.getClassByCourse(course);
        return res.status(200).json(response);
    }
    catch (error) {
        next(error);
    }
}

const registerClass = async (req, res) => {
    const {_id, studentId} = req.body;
    if(!_id || !studentId)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.registerClass(_id, studentId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const acceptStudentToClass = async (req, res) => {
    const {_id, studentId} = req.body;
    if(!_id || !studentId)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.acceptStudentToClass(_id, studentId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const finishCourse = async (req, res) => {
    const {_id, studentId, point} = req.body;
    if(!_id || !studentId || !point)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.finishCourse(_id, studentId, point);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
const getSchedules = async (req, res) => {
    const {studentId} = req.body;
    if(!studentId)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.getSchedules(studentId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const getRegisteredCourse = async (req, res) => {
    const {studentId} = req.body;
    if(!studentId)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.getRegisteredCourse(studentId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
const getAllClasses = async (req, res) => {
    try {
        const response = await courseService.getAllClasses();
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
const getWaitingList = async (req, res) => {
    const {_id} = req.body;
    if(!_id)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.getWaitingList(_id);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    addCourse,
    getAllCourses,
    addMajor,
    addClass,
    getCourceByMajor,
    getClassByCourse,
    registerClass,
    acceptStudentToClass,
    finishCourse,
    getSchedules,
    getRegisteredCourse,
    getAllClasses,
    getWaitingList
}