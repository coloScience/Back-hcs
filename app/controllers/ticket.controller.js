const db = require("../models");
const {server_ip} = require('../config/hosts.config.js')
const User = db.user;
const Role = db.role;
const Ticket = db.ticket
const TicketStatus = db.ticketstatus
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
    console.log(req.body)
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
        updatedAt: new Date(),
        status: 'created'
    }
    Ticket.create(body)
        .then(res.status(200))
}
exports.ticketGet = (req,res) => {
    if (req.headers.referer === `${server_ip}/manage` && req.headers.authorization) {
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
exports.cangeStatus = async (req,res) => {

    Ticket.update({status: req.body.status},{where: {id: req.body.id}})
        .then(res.status.ok)
}

