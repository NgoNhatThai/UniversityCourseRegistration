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
    router.route('/getCourceByMajor')
        .get(courseController.getCourceByMajor);
    router.route('/getClassByCourse')
        .get(courseController.getClassByCourse);
    router.route('/registerClass')
        .post(courseController.registerClass);
    router.route('/acceptStudentToClass')
        .put(courseController.acceptStudentToClass);
    router.route('/finishCourse')
        .put(courseController.finishCourse);
    router.route('/getSchedules')
        .get(courseController.getSchedules);
    return router;
}

module.exports = InitRoutesCourse;