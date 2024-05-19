const Student = require("../config/models/student.model");
const StudyStatus = require("../config/models/study_status.model");
const getNameCourseById = require("./course.service");
import { random_bg_color } from '../ultils/random';
import customizeUser, { hashPassword, checkPassword } from '../ultils/customizeUser';
import mongoose from 'mongoose';

const register = async ( studentId, name, email, dateOfBirth, major, gender, homeTown, schoolYear, educationLevel, clazz) => {
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
            gender: gender,
            homeTown: homeTown,
            schoolYear: schoolYear,
            educationLevel: educationLevel,
            clazz: clazz,
            status: true
        }
        // push data to database
        const student = new Student(data);
        const result = await student.save();

        // create study status
         const studyStatus = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            studentId: studentId,
            studiedCourses: [],
            currentCourses: [],
            failedCourses: [],
            GPA: 0,
            credit: 0,
            status: true
        }   
        const studyStatusModel = new StudyStatus(studyStatus);
        await studyStatusModel.save();
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
        const student = await Student.findOne({ studentId: studentId }).populate('major', 'name');        
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
const resetPassword = async (studentId, newPassword) => {
    try {
        const student = await Student.findOne({ studentId: studentId });
        if (!student) {
            return {
                errCode: 2,
                message: 'Student not found'
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
const getStudentById = async (studentId) => {
    try {
        const student = await Student.findOne({ studentId: studentId });
        if (!student) {
            return {
                errCode: 2,
                message: 'Student not found'
            }
        }
        return student;
    }
    catch (error) {
        return null;
    }
}
const getStudentStatus = async (studentId) => {
    try {
        const studyStatus = await StudyStatus.findOne({studentId: studentId});
        const student = await Student.findOne({ studentId: studentId });
        if (!studyStatus || !student) {
            return {
                errCode: 2,
                message: 'Student not found'
            }
        } 
        return {
            errCode: 0,
            message: 'Get student status success',
            data: [student, studyStatus]
        }
    } catch (error) {
        return {
            errCode: 5,
            message: 'Some errors occur, please try again!'
        }
    }
}
const getStatus = async (studentId) => {
    try {
        const studyStatus = await StudyStatus.findOne({studentId: studentId});
        if (!studyStatus) {
            return {
                errCode: 2,
                message: 'Student not found'
            }
        }   
        return {
            errCode: 0,
            message: 'Get student status success',
            data: studyStatus
        }
    }
    catch (error) {
        return {
            errCode: 5,
            message: 'Some errors occur, please try again!'
        }
    }
}
const convertGrade = (grade10Scale) =>{
    let gradeLetter;
    
    if (grade10Scale >= 8.5) {
        gradeLetter = 'A';
    } else if (grade10Scale >= 7) {
        gradeLetter = 'B';
    } else if (grade10Scale >= 5.5) {
        gradeLetter = 'C';
    } else if (grade10Scale >= 4) {
        gradeLetter = 'D';
    } else {
        gradeLetter = 'F';
    }

    return gradeLetter;
}
const evaluateAcademicPerformance=(score) =>{
    let performance;
    
    if (score >= 8.5) {
        performance = 'Giỏi';
    } else if (score >= 7) {
        performance = 'Khá';
    } else if (score >= 5.5) {
        performance = 'Trung bình';
    } else if (score >= 4) {
        performance = 'Yếu';
    } else {
        performance = 'Kém';
    }

    return performance;
}
const getStudyResult = async (studentId) => {
    try {
        const studyStatus = await StudyStatus.findOne({studentId: studentId});  
        if (!studyStatus) {
            return {
                errCode: 2,
                message: 'Student not found'
            }
        }
        const studiedCourses = studyStatus.studiedCourses;
        const studyResultPromises = studiedCourses.map(async (result) => {
            return {
                _id: result?.course?._id,
                name: result?.course?.name,
                credit: result?.course?.credit,
                point_10: result?.point,
                point_4: (result?.point/10)*4,
                point_char: convertGrade(result?.point),
                academic_performance: evaluateAcademicPerformance(result?.point)
            };
        });
        const studyResult = await Promise.all(studyResultPromises);
        return {
            errCode: 0,
            message: 'Get study result successfully',
            data: studyResult
        };
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
    changePassword,
    resetPassword,
    getStudentStatus,
    getStatus,
    getStudyResult,
    getStudentById
}