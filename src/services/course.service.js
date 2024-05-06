const Course = require("../config/models/course.model");
const Major = require("../config/models/major.model");
const Class = require("../config/models/class.model");
const StudyStatus = require("../config/models/study_status.model");
import mongoose from 'mongoose';

const addCourse = async (courseId, name, credit, prerequisiteCourse) => {
    try {
        // return {courseId, name, credit, prerequisiteCourse}
        // check course exists;
        const courseExists = await Course.findOne({ courseId: courseId });
        if (courseExists)
            return {
                errCode: 4,
                message: 'Course is exists, Please use new another course'
            }
        // return courseExists;
        //create new course;
        const _id = new mongoose.Types.ObjectId().toHexString()
        const data = {
            _id: _id,
            courseId: courseId,
            name: name,
            credit: credit,
            prerequisiteCourse: prerequisiteCourse,
            status: true
        }
        // push data to database
        const course = new Course(data);
        const result = await course.save();
        if (result) {
            return {
                errCode: 0,
                message: 'Created new course!',
                data: course
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

const addMajor = async (majorId, name) => {
    try {
        const majorExists = await Major.findOne({ majorId: majorId });
        if (majorExists)
            return {
                errCode: 4,
                message: 'Major is exists, Please use new another major'
            }
        const _id = new mongoose.Types.ObjectId().toHexString()
        const data = {
            _id: _id,
            majorId: majorId,
            name: name,
            status: true
        }
        const major = new Major(data);
        const result = await major.save();
        if (result) {
            return {
                errCode: 0,
                message: 'Created new major!',
                data: major
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

const addClass = async (courseId, major, instructor, maxStudents, waitingStudents, registeredStudents, classSchedule, room) => {
    try {
        // return { classId, courseId, major, instructor, maxStudents, waitingStudents, registeredStudents, classSchedule, room }
       
        const _id = new mongoose.Types.ObjectId().toHexString()
        const classExists = await Course.findOne({ _id: _id });
        if (classExists)
            return {
                errCode: 4,
                message: 'Class is exists, Please use new another class'
            }
        const data = {
            _id: _id,
            courseId: courseId,
            major: major,
            instructor: instructor,
            maxStudents: maxStudents,
            waitingStudents: waitingStudents,
            registeredStudents: registeredStudents,
            classSchedule: classSchedule,
            room: room,
            status: true
        }
       
        const clazz = new Class(data);
        const result = await clazz.save();
        if (result) {
            return {
                errCode: 0,
                message: 'Created new class!',
                data: clazz
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
const getCourceByMajor = async (major) => {
    try {
        const courses = await Course.find({ major: major })
        if(courses){
            return {
                errCode: 0,
                message: 'Get courses by major successfully',
                data: courses,
            }
        }
    } catch (error) {
        return {
            errCode: 1,
            message: 'Get courses by major failed',
        }
    }
    
}
const getClassByCourse = async (course) => {
    try {
        const classes = await Class.find({ courseId: course })
            .populate('courseId', 'name')
            .populate('major', 'name');
        if (classes)
            return {
                errCode: 0,
                message: 'Get all classes successfully',
                data: classes,
            }
    } catch (error) {
        return {
            errCode: 1,
            message: 'Get all classes failed',
        }
    }
}


const registerClass = async (classId, studentId) => {
    try {
        const clazz = await Class.findOne({ classId: classId });
        if (!clazz)
            return {
                errCode: 2,
                message: 'Class is not exists'
            }
        const course = await Course.findOne({ _id: clazz.courseId });
        const prerequisiteCourse = course.prerequisiteCourse;
        const studyStatus = await StudyStatus.findOne({studentId: studentId});
        const studiedCourses = studyStatus.studiedCourses;
        
        if(prerequisiteCourse.every(course => studiedCourses.includes(course)) || prerequisiteCourse.length == 0){
            const registeredStudents = clazz.registeredStudents;
            const waitingStudents = clazz.waitingStudents;
            if (registeredStudents.includes(studentId))
                return {
                    errCode: 3,
                    message: 'Student is already registered'
                }
            else if (waitingStudents.includes(studentId))
                return {
                    errCode: 4,
                    message: 'Student is already in waiting list'
                }
            else
            if (registeredStudents.length >= clazz.maxStudents) {
                return {
                    errCode: 3,
                    message: 'Class is full'
                }
            }
            else {
                clazz.waitingStudents.push(studentId);
                const result = await clazz.save();
                if (result)
                    return {
                        errCode: 0,
                        message: 'Register class successfully',
                        waiting: clazz.waitingStudents,
                        registered: clazz.registeredStudents
                        
                    }
                else
                    return {
                        errCode: 1,
                        message: 'Register class failed'
                    }
            }
        } else {
            return {
                errCode: 6,
                message: 'Not yet finish prerequisiteCourse',
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

const acceptStudentToClass = async (classId, studentId) => {
    try {
        const clazz = await Class.findOne({ _id: classId });
        if (!clazz)
            return {
                errCode: 2,
                message: 'Class is not exists'
            }
        const waitingStudents = clazz.waitingStudents;
        const registeredStudents = clazz.registeredStudents;
        if (registeredStudents.includes(studentId))
            return {
                errCode: 3,
                message: 'Student is already registered'
            }
        const index = waitingStudents.indexOf(studentId);
        if (index === -1)
            return {
                errCode: 3,
                message: 'Student is not in waiting list'
            }
        else {
            if(registeredStudents.length < clazz.maxStudents){
                clazz.registeredStudents.push(studentId);
                clazz.waitingStudents.splice(index, 1);
                const result = await clazz.save();
                const studyStatus = await StudyStatus.findOne({studentId: studentId});
                if(studyStatus) {
                    const course = await Course.findOne({ _id: clazz.courseId });
                    studyStatus.currentCourses.push(course);
                    await studyStatus.save()
                } else {
                    return {
                        errCode: 4,
                        message: 'Cannot find student status!'
                    }
                }
                if (result)
                    return {
                        errCode: 0,
                        message: 'Accept student to class successfully',
                        waiting: clazz.waitingStudents,
                        registered: clazz.registeredStudents
                    }
                else
                    return {
                        errCode: 1,
                        message: 'Accept student to class failed'
                    }
            }
            else {
                return {
                    errCode: 3,
                    message: 'Class is full'
                }
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

const finishCourse = async (classId, studentId, point) => {
    try {
        const clazz = await Class.findOne({ classId: classId });
        if(!clazz)
            return {
                errCode: 2,
                message: 'Class is not exists'
            }
        const registeredStudents = clazz.registeredStudents;
        if(registeredStudents.includes(studentId)){
            const studyStatus = await StudyStatus.findOne({studentId: studentId});
            if(!studyStatus)
                return {
                    errCode: 2,
                    message: 'Student is not exists'
                };
            const course = await Course.findOne({ _id: clazz.courseId });
            const credit = course.credit;
            const result = false;
            if(point >= 5) {
                const studyResult = {
                    course: course,
                    point: point
                }
                studyStatus.studiedCourses.push(studyResult);
                studyStatus.credits += Number(credit)
                studyStatus.GPA = (studyStatus.GPA + Number(point)) / 2;
                result = await studyStatus.save();

            }
            else {
                const studyResult = {
                    course: course,
                    point: point
                }
                studyStatus.failedCourses.push(studyResult);
                await studyStatus.save();
                return {
                    errCode: 6,
                    message: 'Failed course',
                    data: studyStatus.studiedCourses
                }
            }
            
            if(result)
                return {
                    errCode: 0,
                    message: 'Finish course successfully',
                    data: studyStatus.studiedCourses
                }
            else
                return {
                    errCode: 1,
                    message: 'Finish course failed'
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
    addCourse,
    addMajor,
    getAllCourses,
    addClass,
    getCourceByMajor,
    getClassByCourse,
    registerClass,
    acceptStudentToClass,
    finishCourse
}