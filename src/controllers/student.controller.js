import studentService from '../services/student.service.js';
const register = async (req, res, next) => {
    const {studentId, name, email, dateOfBirth, major} = req.body;
    if(!studentId || !name || !email || !dateOfBirth || !major)
        return res.status(400).json({errCode: 1, message: 'Missing required fields'});
    try {
        const response = await studentService.register(studentId, name, email, dateOfBirth, major);
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
module.exports = {
    register,
    updateStudent
}