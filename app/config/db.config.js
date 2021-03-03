module.exports = {
  HOST: "localhost",
  USER: "mysql",
  PASSWORD: "1234",
  DB: "testForTest",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
