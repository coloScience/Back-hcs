const db = require("../models");
const User = db.user;
const Role = db.role;
const Ticket = db.ticket


exports.ticketPost = (req,res) => {
    console.log(req)
    Ticket.create({
        login: req.body.login,
        email: req.body.email,
        title: req.body.title,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        lastName: req.body.lastName,
        reason: req.body.reason,
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then((record) => console.log(record))
        .then(res.status(200))
    const createToken = () => {

    }
}
exports.ticketGet = (req,res) => {
    Ticket.findAll({raw:true}).then(tickets=>{
        res.send(JSON.stringify(tickets))
        res.status(200)
    }).catch(err=>console.log(err));
    const getTickets = () => {

    }
    getTickets()
}
