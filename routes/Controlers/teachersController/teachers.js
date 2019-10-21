const db = require("../../../models");

const teachersController = {
    create: (req, res) => {
        const response = {};

        db.teachers.create({
            name: req.body.name,
        }).then(ress => {
            response.statusCode = 200;
            response.body = JSON.stringify(
                {
                    message: "teacher added",
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
        db.teachers.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            response.statusCode = 200;
            response.body = JSON.stringify({
                message: 'teacher Deleted',

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
        db.teachers.findAll({
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
            db.teachers.findOne({
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
        db.teachers.update(data, {
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
        }); }

};

module.exports = teachersController;