import express from "express"
import InitRoutesStudent from '../routes/student.route';

const router = express.Router();

const configRoutes = async (app) => {
    app.get('/', (req, res) => {
        return res.send('index');
    })
    // app.use('/auth', InitRoutesAuthentication(router));
    // app.use('/users', InitRoutesUsers(router));
    // app.use('/chat', InitRoutesChat(router));
    app.use('/student',InitRoutesStudent(router));

}

module.exports = configRoutes;