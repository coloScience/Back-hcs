const db = require("../models");
const {server_ip, pool} = require('../config/hosts.config.js')
const Ticket = db.ticket


exports.ticketPost = (req,res) => {
    pool.getConnection(function(error, connection){
        console.log('Connected ticketPost!:)');
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
        connection.query(`select username from users where username = '${ticket.login}'`,(err, result, fields) => {
            if (!err) {
                connection.release()
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
    });
}
exports.ticketGet = (req,res) => {
    pool.getConnection(function(error, connection){
        console.log('Connected ticketGet!');
        let url = req.body.headers.props
        url = url.slice(1,31)
        if (url === `${server_ip}/manager` && !!req.body.headers.Authorization) {
            console.log('moder')
            connection.query('select * from tickets', (err, result) => {
                res.send(result)
                connection.release()
            })
        } else if (!!req.body.headers.Authorization) {
            console.log('user')
            connection.query(`select * from tickets where login = '${JSON.parse(req.body.headers.props).login}'`, (err, result) => {
                res.send(result)
                connection.release()
            })
        } else {
            console.log('not auth')
            res.send({error: 'not authorization'})
            res.status(403)
            console.log('user')
        }
    });
}
