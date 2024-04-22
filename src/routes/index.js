import express from "express"
import InitRoutesStudent from '../routes/student.route';
import InitRoutesCourse from '../routes/course.route';

const router = express.Router();

const configRoutes = async (app) => {
    app.get('/', (req, res) => {
        return res.send('index');
    })
    app.use('/student',InitRoutesStudent(router));
    app.use('/course',InitRoutesCourse(router));

}

module.exports = configRoutes;