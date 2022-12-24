const mongoose = require('mongoose');

const todosSchema = ({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    userID: { type: String, required: true }
});

const TodosModel = mongoose.model('todos', todosSchema);

module.exports = { TodosModel };