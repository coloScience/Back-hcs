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

exports.ticketToWorker = (req,res) => {
  connection.query(`select *, t.id as id from worker_ticket join tickets t on worker_ticket.ticketID = t.id join users u on u.id = worker_ticket.userID where username = '${JSON.parse(req.body.data.login).username}' group by ticketID`, (err, result) => {
    res.send(JSON.stringify(result))
    console.log(result)
  })
}
exports.workerGet = (req,res) => {
  connection.query(`select firstName,secondName,lastName, userId from user_roles inner join users u on user_roles.userId = u.id where roleId = 5;`, (err, result) => {
    res.send(JSON.stringify(result))
  })
}
exports.workerSet = (req,res) => {
  let time = new Date().toISOString().slice(0, 19).replace('T', ' ')
  connection.query(`insert into worker_ticket(userID, ticketID, createAt, updatedAt) value (${req.body.data.userid},${req.body.data.ticketid},'${time}','${time}')`, (err, result) => {
    res.send(result)
  })
}
