const db = require("../../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// const deepLoop = (ended) => {
//     return new Promise((resolve, reject) => {
//         if (ended <= 100) {
//             resolve("ok")
//         } else {
//             reject("sorry")
//         }
//     });
// };
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
//1
    studentsNotAssignedCourses: (req, res) => {
        let response = {};

        db.students.findAll({
            include: [{
                model: db.assign_student_courses,
                as: 'assign_student_courses',
                required: false,
                where: {s_id: {[Op.is]: null}},
            }]
        }).then((data) => {
            console.log(data);
            response.statusCode = 200;
            response.body = JSON.stringify({
                data: data
            });
            res.status(response.statusCode).send(response.body);

        }).catch(err => {
            response.statusCode = 409;
            response.body = JSON.stringify({err});
            console.log("err", err);
            res.status(response.statusCode).send(response.body);
        });
    },
    asyncPromise: (req, res) => {
        // deepLoop(99)
        //     .then(res => {
        //         console.log("res", res)
        //     })i
        //     .catch(err => {
        //         console.log("err", err);
        //     })
        let response = {};
        let count = 0;
        for (let i = 0; i <= 1000000; i++) {
            for (let j = 0; j <= 1000000; j++) {
                count = i + j;
            }
        }
        console.log("count", count);
        response.statusCode = 200;
        response.body = JSON.stringify({
            data: count
        });
        res.status(response.statusCode).send(response.body);
    }
};

module.exports = StudentsController;