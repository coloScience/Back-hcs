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

module.exorts=connection;