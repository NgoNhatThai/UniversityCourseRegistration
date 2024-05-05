import studentController from '../controllers/student.controller';

const IntRoutesStudent = (router) => {
    router.route('/register')
        .post(studentController.register)
        .put(studentController.updateStudent);
    router.route('/login')  
        .get(studentController.login);
    router.route('/changePassword')
        .put(studentController.changePassword);
    router.route('/resetPassword')
        .put(studentController.resetPassword);
    return router;
}

module.exports = IntRoutesStudent;