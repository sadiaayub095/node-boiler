const db = require("../../../models");

const coursesController = {
    create: (req, res) => {
        const response = {};

        db.courses.create({
            name: req.body.name,
        }).then(ress => {
            response.statusCode = 200;
            response.body = JSON.stringify(
                {
                    message: "courses added",
                    data: ress
                }
            );
            res.status(response.statusCode).send(response.body);
        }).catch(err => {
            console.log("show me error", err);
            response.statusCode = 500;
            response.body = JSON.stringify({errors: err});
            res.status(response.statusCode).send(response.body);
        })

    },
    delete: (req, res) => {
        let response = {};
        db.courses.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'Deleted',

            });
            res.status(response.statusCode).send(response.body);
        })
            .catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({err});
                res.status(response.statusCode).send(response.body);
            });
    },

    all: (req, res) => {
        const response = {};
        db.courses.findAll({
            attributes: ['id', 'name'],
        })
            .then(data => {
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: 'Ok',
                    data: data
                });
                res.status(response.statusCode).send(response.body);
            }).catch(err => {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        });
    },

    getOne: (req, res) => {
        const response = {};
        if ("undefined" !== req.params.id) {
            db.courses.findOne({
                attributes: ['id', 'name'],
                where: {id: req.params.id}
            }).then(data => {
                response.statusCode = 200;
                response.body = JSON.stringify({
                    message: 'Ok',
                    data: data
                });
                res.status(response.statusCode).send(response.body);
            }).catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({err});
                res.status(response.statusCode).send(response.body);
            });
        }
    },

    update: (req, res) => {
        const response = {};
        let data = [];
        data["name"] = req.body.name;
        db.courses.update(data, {
            where: {
                id: req.params.id
            }
        }).then((data) => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'Updated',
                data: data
            });
            res.status(response.statusCode).send(response.body);
        }).catch(err => {
            response.statusCode = 506;
            response.body = JSON.stringify({err});
            console.log(err);
            res.status(response.statusCode).send(response.body);
        });
    },


    //3
    teachersCourses:(req, res) => {
        let response = {};

        db.findAll({include: [ { teachers, courses,assign_teacher_courses}] } ,{

        }).then((data) => {
            console.log("");
            response.statusCode = 200;
            response.body = JSON.stringify({
                data: data
            });
            res.status(response.statusCode).send(response.body);

        }).catch(err => {
            response.statusCode = 506;
            response.body = JSON.stringify({err});
            console.log(err);
            res.status(response.statusCode).send(response.body);
        });
    },


    //4
    studentsCourses:(req, res) => {
        let response = {};

        db.findAll({include: [ { students, courses,assign_student_courses}] } ,{

        }).then((data) => {
            console.log("");
            response.statusCode = 200;
            response.body = JSON.stringify({
                data: data
            });
            res.status(response.statusCode).send(response.body);

        }).catch(err => {
            response.statusCode = 506;
            response.body = JSON.stringify({err});
            console.log(err);
            res.status(response.statusCode).send(response.body);
        });
    }

    };

module.exports = coursesController;