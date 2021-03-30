const db = require("../models");
const {pool} = require('../config/hosts.config.js')
const mysql = require('mysql');

exports.ticketToWorker = (req,res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select *, t.id as id from worker_ticket join tickets t on worker_ticket.ticketID = t.id join users u on u.id = worker_ticket.userID where username = '${JSON.parse(req.body.data.login).username}' group by ticketID`, (err, result) => {
      res.send(JSON.stringify(result))
      console.log(result)
      connection.release()
    })
  })
}
exports.workerGet = (req,res) => {
  pool.getConnection((err, connection) => {
    connection.query(`select firstName,secondName,lastName, userId from user_roles inner join users u on user_roles.userId = u.id where roleId = 5;`, (err, result) => {
      res.send(JSON.stringify(result))
      connection.release()
    })
  })
}
exports.workerSet = (req,res) => {
  pool.getConnection((err, connection) => {
    let time = new Date().toISOString().slice(0, 19).replace('T', ' ')
    connection.query(`insert into worker_ticket(userID, ticketID, createAt, updatedAt) value (${req.body.data.userid},${req.body.data.ticketid},'${time}','${time}')`, (err, result) => {
      res.send(result)
      connection.release()
    })
  })
}
