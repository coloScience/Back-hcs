const db = require("../models");
const User = db.user;
const Role = db.role;
const Ticket = db.ticket


exports.ticketPost = (req,res) => {
    console.log(req.body)
    Ticket.create({
        login: req.body.login,
        email: req.body.email,
        title: req.body.title,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        lastName: req.body.lastName,
        reason: req.body.reason,
        phone: req.body.phone,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then((record) => console.log(record))
        .then(res.status(200))
}
exports.ticketGet = (req,res) => {
    console.log(req.headers)
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
