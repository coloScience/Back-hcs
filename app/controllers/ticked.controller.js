const db = require("../models");
const User = db.user;
const Role = db.role;
const Ticked = db.ticked


exports.tickedPost = (req,res) => {
    const createToken = () => {
        let responses = req.body
        Ticked.create({
            login: req.body.login,
            email: req.body.email,
            title: req.body.title,
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            lastName: req.body.lastName,
            reason: req.body.reason,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then((record) => console.log(record))
        .then(res.status(200))
    }
    createToken()
}
exports.tickedGet = (req,res) => {
    const getTickets = () => {
        Ticked.findAll({raw:true}).then(tickeds=>{
            res.send(JSON.stringify(tickeds))
            res.status(200)
        }).catch(err=>console.log(err));
    }
    getTickets()
}
