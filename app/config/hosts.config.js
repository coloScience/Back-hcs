const mysql = require('mysql');
module.exports = {
    server_ip: 'http://colo-science.ru',
    pool: pool = mysql.createPool({
        connectionLimit: 100,
        host: "77.51.186.158",
        user: "morett",
        password: "ithub123",
        database: "hcs"
    })
};