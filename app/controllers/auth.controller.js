const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  console.log(req.body)
  if(req.body.password === req.body.repeatPassword) {
    User.create({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      brithDay: req.body.brithDay,
      street: req.body.street,
      house: req.body.house,
      flat: req.body.flat,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            let token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400 // 24 hours
            });

            let authorities = [];
            user.getRoles().then(roles => {
              for (let i = 0; i < roles.length; i++) {
                authorities.push(roles[i].name);
              }
              res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
              });
            });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });

          let authorities = [];
          user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push(roles[i].name);
            }
            res.status(200).send({
              id: user.id,
              username: user.username,
              firstName: user.firstName,
              secondName: user.secondName,
              lastName: user.lastName,
              email: user.email,
              roles: authorities,
              accessToken: token
            });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  }
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name);
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          secondName: user.secondName,
          lastName: user.lastName,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
