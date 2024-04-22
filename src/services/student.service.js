const Student = require("../config/models/student.model");
import { random_bg_color } from '../ultils/random';
import customizeUser, { hashPassword, checkPassword } from '../ultils/customizeUser';
import mongoose from 'mongoose';

const register = async ( studentId, name, email, dateOfBirth, major) => {
    try {
        // return {studentId, name, email, dateOfBirth, major};
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
module.exports = {
    register
}