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
    const {courseId, major, instructor, maxStudents, waitingStudents, registeredStudents, classSchedule, room} = req.body;
    if(!courseId || !major || !instructor || !maxStudents || !waitingStudents || !registeredStudents || !classSchedule || !room)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.addClass(courseId, major, instructor, maxStudents, waitingStudents, registeredStudents, classSchedule, room);
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
    const {classId, studentId} = req.body;
    if(!classId || !studentId)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.registerClass(classId, studentId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const acceptStudentToClass = async (req, res) => {
    const {classId, studentId} = req.body;
    if(!classId || !studentId)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.acceptStudentToClass(classId, studentId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

const finishCourse = async (req, res) => {
    const {classId, studentId, point} = req.body;
    if(!classId || !studentId || !point)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await courseService.finishCourse(classId, studentId, point);
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
}