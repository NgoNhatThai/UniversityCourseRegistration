import courseController from '../controllers/course.controller';

const InitRoutesCourse = (router) => {
    router.route('/addCourse')
        .post(courseController.addCourse);
    router.route('/getAllCourses')
        .get(courseController.getAllCourses);
    router.route('/addMajor')
        .post(courseController.addMajor);
    router.route('/addClass')
        .post(courseController.addClass);
    router.route('/getClassByMajor')
        .get(courseController.getClassByMajor);
    router.route('/registerClass')
        .post(courseController.registerClass);
    router.route('/acceptStudentToClass')
        .put(courseController.acceptStudentToClass);
    return router;
}

module.exports = InitRoutesCourse;