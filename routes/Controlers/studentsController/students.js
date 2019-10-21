const db = require("../../../models");

const StudentsController = {
    create: (req, res) => {
        const response = {};

        db.students.create({
            name: req.body.name,
        }).then(ress => {
            response.statusCode = 200;
            response.body = JSON.stringify(
                {
                    message: "student added",
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
        db.students.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'User Deleted',

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
        db.students.findAll({
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
            db.students.findOne({
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
        db.students.update(data, {
            where: {
                id: req.params.id
            }
        }).then((data) => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'User Updated',
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

   // studentsNotAssignedCourses:(req, res) => {
     //   let response = {}
       // db.students.findAll({include "assign_student_course"}).then(data+.)
    // }

};

module.exports = StudentsController;