exports.allAccess = (req, res) => {
  res.status(200).send("Добро пожаловать, публичный контент!");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Заявки.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Назначения исполнителя на заявку.");
};
