import studentController from '../controllers/student.controller';

const IntRoutesStudent = (router) => {
    router.route('/register')
        .post(studentController.register)
        .put(studentController.updateStudent)
   

    return router;
}

module.exports = IntRoutesStudent;