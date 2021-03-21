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

exports.getStatus = (req,res) => {
  connection.query(`select name from statuses join ticket_statuses ts on statuses.id = ts.statusId where ticketId = ${req.body.data.id}`,(err, result) => {
    res.send(result)
  })
}
exports.changeStatus = (req, res) => {
  let time = new Date().toISOString().slice(0, 19).replace('T', ' ')
  let {id, status} = req.body
  connection.query(`insert into ticket_statuses (ticketId, statusId, createdAt, updatedAt) value (${id}, ${status}, '${time}', '${time}')`, (err, result) => {
    res.send('ok')
  })
}
