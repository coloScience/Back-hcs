const db = require("../models");
const User = db.user;
const Role = db.role;
const Ticket = db.ticket


exports.ticketPost = (req,res) => {
    let body = {
        login: req.body.login,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        lastName: req.body.lastName,
        email: req.body.email,
        title: req.body.title,
        reason: req.body.reason,
        phone: req.body.phone,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    Ticket.create(body)
        .then((record) => console.log(record))
        .then(res.status(200))
}
exports.ticketGet = (req,res) => {
    if (req.headers.referer === 'http://localhost:8081/admin' && req.headers.authorization) {
        Ticket.findAll({raw:true}).then(tickets=>{
            res.send(JSON.stringify(tickets))
            res.status(200)
        }).catch(err=>console.log(err));
    } else {
        Ticket.findAll({where:{login: req.headers.login},raw:true}).then(tickets=>{
            res.send(JSON.stringify(tickets))
            res.status(200)
        }).catch(err=>console.log(err));
    }
}
