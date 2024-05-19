import studentService from '../services/student.service.js';
const register = async (req, res, next) => {
    const {studentId, name, email, dateOfBirth, major, gender, homeTown, schoolYear, educationLevel, clazz} = req.body;
    if(!studentId || !name || !email || !dateOfBirth || !major || !gender || !homeTown || !schoolYear || !educationLevel || !clazz)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await studentService.register(studentId, name, email, dateOfBirth, major, gender, homeTown, schoolYear, educationLevel, clazz);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
const updateStudent = async (req, res, next) => {
    const {studentId, name, type, email, dateOfBirth, major} = req.body;
    try {
        const response = await studentService.updateStudent(studentId, name, type, email, dateOfBirth, major);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
const login = async (req, res, next) => { 
    const {studentId, password} = req.body;
    if(!studentId || !password)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await studentService.login(studentId, password);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
const changePassword = async (req, res, next) => { 
    const {studentId, oldPassword, newPassword} = req.body;
    if(!studentId || !oldPassword || !newPassword)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await studentService.changePassword(studentId, oldPassword, newPassword);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }

}
const resetPassword = async (req, res, next) => { 
    const {studentId, newPassword} = req.body;
    if(!studentId || !newPassword)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await studentService.resetPassword(studentId, newPassword);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }

}
const getStudentStatus = async (req, res, next) => {
    const {studentId} = req.body;
    if(!studentId)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await studentService.getStudentStatus(studentId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
const getStatus = async (req, res, next) => {
    const {studentId} = req.body;
    if(!studentId)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await studentService.getStatus(studentId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
const getStudyResult = async (req, res, next) => {
    const {studentId} = req.body;
    if(!studentId)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await studentService.getStudyResult(studentId);
        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}
module.exports = {
    register,
    updateStudent,
    login,
    changePassword,
    resetPassword,
    getStudentStatus,
    getStatus,
    getStudyResult
}