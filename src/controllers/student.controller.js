import studentService from '../services/student.service.js';
const users = require("../../src/config/models/userSchema");
const userotp = require("../../src/config/models/userOtp");
const nodemailer = require("nodemailer");

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

const sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Please Enter Your Email" });
    }

    try {
        const OTP = Math.floor(100000 + Math.random() * 900000);

        const existEmail = await userotp.findOne({ email: email });
        if (existEmail) {
            await userotp.findOneAndUpdate({ email: email }, { otp: OTP });
        } else {
            const saveOtpData = new userotp({ email, otp: OTP });
            await saveOtpData.save();
        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "robertcena30@gmail.com",
                pass: "pudrzgdsxfturbtb"
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Xác thực đăng ký học phần",
            text: `Mã OTP của bạn là: ${OTP}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(400).json({ error: "Email not sent" });
            } else {
                return res.status(200).json({ 
                    errCode: 0,
                    message: "Email sent successfully" });
            }
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(400).json({ 
            errCode: 1,
            error: "Invalid Details", error });
    }
};

const verifyOTP = async (req,res) => {

    const {email,otp} = req.body;

    if(!otp || !email){
        res.status(400).json({ error: "Please Enter Your OTP and email" })
    }

    try {
        const otpverification = await userotp.findOne({email:email});

        if(otpverification.otp === otp){
           res.status(200).json({
            errCode: 0,
            message:"Verify OTP Success"});

        }else{
            res.status(400).json({
            errCode: 1,
            error:"Invalid Otp"})
        }
    } catch (error) {
        res.status(400).json({
            errCode: 2, 
            error: "Invalid Details", error })
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
    sendOTP,
    verifyOTP
}