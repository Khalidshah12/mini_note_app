const express = require('express');
const { TodosModel } = require('../models/Todos.model');
require('dotenv').config();
const todosRouter = express.Router();

todosRouter.get('/', async (req, res) => {
    try {
        const todos = await TodosModel.find({ userID: req.body.userID });
        res.send(todos);
    } catch (e) {
        res.send({ Error: "Something Went Wrong, Please Try Again Later" });
    }
})

todosRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const todos = await TodosModel.find({ _id: id });
        res.send(todos);
    } catch (e) {
        res.send({ Error: "Something Went Wrong, Please Try Again Later" });
    }
})

todosRouter.post('/create', async (req, res) => {
    try {
        const data = req.body;
        const todos = new TodosModel(data);
        await todos.save();
        res.send('Posted Successfully');
    } catch (e) {
        res.send({ Error: "Something Went Wrong, Please Try Again Later" });
    };
});

todosRouter.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const userID = req.body?.userID;
        const todo = await TodosModel.findOne({ _id: id })
        if (userID === todo.userID) {
            await TodosModel.findByIdAndUpdate({ _id: id }, data);
            res.send("Updated Successfully");
        } else {
            res.send('Not Authroised')
        }
    } catch (e) {
        res.send({ Error: "Something Went Wrong, Please Try Again Later" });
    };
});

todosRouter.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userID = req.body?.userID;
        const todo = await TodosModel.findOne({ _id: id })
        if (userID === todo.userID) {
            await TodosModel.findByIdAndDelete({ _id: id });
            res.send("Deleted Successfully");
        } else {
            res.send('Not Authroised')
        }
    } catch (e) {
        res.send({ Error: "Something Went Wrong, Please Try Again Later" });
    };
});

module.exports = { todosRouter };
