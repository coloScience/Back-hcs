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

exports.rebase = (req,res) => {
  let time = new Date()
  time.setHours(time.getHours() + 6, time.getMinutes() + time.getTimezoneOffset())
  time = time.toISOString().slice(0, 19).replace('T', ' ')
  connection.query(`select createdAt from ticket_statuses where ticketId = ${req.body.data.id}`, (err, result) => {
    let createdAt = result[0].createdAt
    let oldTime = Date.parse(createdAt)
    createdAt = new Date(oldTime)
    createdAt.setHours(createdAt.getHours() + 6, createdAt.getMinutes() + createdAt.getTimezoneOffset())
    createdAt = new Date(createdAt).toISOString().slice(0, 19).replace('T', ' ')
    connection.query(`delete from ticket_statuses where ticketId = ${req.body.data.id}`,(err, result) => {
      connection.query(`insert into ticket_statuses(ticketId, statusId, createdAt, updatedAt) value (${req.body.data.id},1,'${createdAt}','${time}')`, (err1, result1) => {
        res.send(result1)
      })
    })
  })
}
exports.getStatus = (req,res) => {
  connection.query(`select name from statuses join ticket_statuses ts on statuses.id = ts.statusId where ticketId = ${req.body.data.id}`,(err, result) => {
    res.send(result)
  })
}
exports.changeStatus = (req, res) => {
  let time = new Date().toISOString().slice(0, 19).replace('T', ' ')
  console.log(req.body)
  let {id, status} = req.body.data
  console.log(id,status)
  connection.query(`insert into ticket_statuses (ticketId, statusId, createdAt, updatedAt) value (${id}, ${status}, '${time}', '${time}')`, (err, result) => {
    res.send('ok')
    console.log(result)
    console.log(err)
    if (status === 3) {
      connection.query(`delete from worker_ticket where ticketId = ${req.body.data.id}`)
    }
  })
}
