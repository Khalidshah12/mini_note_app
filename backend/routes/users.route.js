const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UsersModel } = require('../models/Users.model');
require('dotenv').config();
const usersRouter = express.Router();

usersRouter.get('/', async (req, res) => {
    try {
        const users = await UsersModel.find();
        res.send(users);
    } catch (e) {
        res.status(500).send({ Error: "server error" })
    }
})

usersRouter.post('/signup', async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        const users = await UsersModel.find({ email });
        if (users.length > 0) {
            res.status(400).send({ Error: "Already have an account, Please try login" });
        } else {
            bcrypt.hash(password, 4, async function (err, hash) {
                if (hash) {
                    const user = new UsersModel({ name, email, mobile, password: hash });
                    await user.save();
                    res.send({ Success: "Signup Successfull" });
                } else {
                    console.log(err)
                    res.status(400).send({ Error: "Something went wrong" })
                }
            });
        }

    } catch (e) {
        res.send({ Error: "Something went wrong" });
    }
})

usersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UsersModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ userID: user[0]._id }, process.env.jwt_code);
                    res.send({ message: "Login Successfull", token: token, username: user[0].name });
                } else {
                    res.status(400).send({ Error: 'email or password wrong' });
                }
            });
        } else {
            res.status(400).send({ Error: "Try login again" })
        }
    } catch (e) {
        res.status(400).send({ Error: "Something went wrong" });
    }
});

module.exports = { usersRouter };