const cors = require('cors');
const bodyParser = require('body-parser');

// Import Route Controllers
const students = require('./Controlers/studentsController/students');
const teachers  = require('./Controlers/teachersController/teachers');
const courses  = require('./Controlers/coursesController/courses');

// Setup Route Bindings
exports = module.exports = function (app) {

// middlewares
// Configure app for bodyParser()
// lets us grab data from the body of POST
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cors());

//endpoints
    app.post('/api/students', students.create);
    app.delete('/api/students/:id', students.delete);
    app.get('/api/students', students.all);
    app.get('/api/students/:id', students.getOne);
    app.put('/api/students/:id', students.update);

    app.post('/api/teachers', teachers.create);
    app.delete('/api/teachers/:id', teachers.delete);
    app.get('/api/teachers', teachers.all);
    app.get('/api/teachers/:id', teachers.getOne);
    app.put('/api/teachers/:id', teachers.update);

    app.post('/api/courses', courses.create);
    app.delete('/api/courses/:id', courses.delete);
    app.get('/api/courses', courses.all);
    app.get('/api/courses/:id', courses.getOne);
    app.put('/api/courses/:id', courses.update);

    //app.get('/studentsNotAssignedCourses',students.studentsNotAssignedCourses);

};