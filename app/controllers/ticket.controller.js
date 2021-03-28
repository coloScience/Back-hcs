const db = require("../models");
const {server_ip} = require('../config/hosts.config.js')
const User = db.user;
const Role = db.role;
const Ticket = db.ticket
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "77.51.186.158",
    user: "morett",
    password: "ithub123",
    database: "hcs"
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Connected!:)');
    }
});

exports.ticketPost = async (req,res) => {
    let ticket = {
        login: req.body.data.login,
        firstName: req.body.data.firstName,
        secondName: req.body.data.secondName,
        lastName: req.body.data.lastName,
        street: req.body.data.street,
        house: req.body.data.house,
        flat: req.body.data.flat,
        email: req.body.data.email,
        title: req.body.data.title,
        reason: req.body.data.reason,
        phone: req.body.data.phone,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    //Создаю новый способ реализации тикета через 3 нормальную форму
    await connection.query(`select username from users where username = '${ticket.login}'`,(err, result, fields) => {
        if (!err) {
            Ticket.create(ticket)
                .then(
                    tickets => {
                        let time = new Date().toISOString().slice(0, 19).replace('T', ' ')
                        connection.query(`insert into ticket_statuses (ticketId, statusId, createdAt, updatedAt) value (${tickets.id}, 1, '${time}', '${time}')`, (err1, result1, fields1) => {
                            res.send(result1)
                        })
                    }
                )

        }
    })
}
exports.ticketGet = async (req,res) => {
    if (req.headers.referer === `${server_ip}/manager` && !!req.body.headers.Authorization) {
        connection.query('select * from tickets', (err, result) => {
            res.send(result)
        })
    } else if (!!req.body.headers.Authorization) {
        connection.query(`select * from tickets where login = '${JSON.parse(req.body.headers.props).login}'`, (err, result) => {
            res.send(result)
        })
    } else {
        res.send({error: 'not authorization'})
        res.status(403)
        console.log('user')
    }
}
