const Student = require("../config/models/student.model");
import { random_bg_color } from '../ultils/random';
import customizeUser, { hashPassword, checkPassword } from '../ultils/customizeUser';
import mongoose from 'mongoose';

const register = async ( studentId, name, email, dateOfBirth, major) => {
    try {
        // check user exists;
        const userExists = await Student.findOne({ studentId: studentId });
        if (userExists)
            return {
                errCode: 4,
                message: 'Student is exists, Please use new another student'
            }
        //create new user;
        const _id = new mongoose.Types.ObjectId().toHexString()
        const avatarRandom = random_bg_color();
        let password = hashPassword('1111');
        const data = {
            _id: _id,
            studentId: studentId,
            name: name,
            type: "undergraduate",
            avatar: Buffer.from(avatarRandom, "utf-8"),
            email: email,
            dateOfBirth: dateOfBirth,
            major: major,
            password,
            status: true
        }
        // push data to database
        const student = new Student(data);
        const result = await student.save();
        if (result) {
            return {
                errCode: 0,
                message: 'Created student account!',
                data: student
            }
        }
        else {
            return {
                errCode: 1,
                message: 'Do not create',
            }
        }
    } catch (error) {
        return {
            errCode: 5,
            message: 'Some errors occur, please try again!'
        }
    }
}
const login = async (studentId, password) => {
    try {
        const student = await Student.findOne({ studentId: studentId });        
        if (!student) {
            return {
                errCode: 2,
                message: 'Student not found'
            }
        }
        const checkPass = checkPassword(password, student.password);
        if (!checkPass) {
            return {
                errCode: 3,
                message: 'Password is incorrect'
            }
        }
        return {
            errCode: 0,
            message: 'Login success',
            data: student
        }
    }
    catch (error) {
        return {
            errCode: 5,
            message: 'Some errors occur, please try again!'
        }
    }
}

const changePassword = async (studentId, oldPassword, newPassword) => {
    try {
        const student = await Student.findOne({ studentId: studentId });
        if (!student) {
            return {
                errCode: 2,
                message: 'Student not found'
            }
        }
        const checkPass = checkPassword(oldPassword, student.password);
        if (!checkPass) {
            return {
                errCode: 3,
                message: 'Password is incorrect'
            }
        }
        const password = hashPassword(newPassword);
        student.password = password;
        const result = await student.save();
        if (result) {
            return {
                errCode: 0,
                message: 'Change password success',
                data: student
            }
        }
        else {
            return {
                errCode: 1,
                message: 'Do not change password',
            }
        }
    }
    catch (error) {
        return {
            errCode: 5,
            message: 'Some errors occur, please try again!'
        }
    }
}
module.exports = {
    register,
    login,
    changePassword
}