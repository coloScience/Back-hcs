module.exports = {
  HOST: "10.1.0.180",
  USER: "morett",
  PASSWORD: "ithub123",
  DB: "testForTest",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
