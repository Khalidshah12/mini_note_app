const express = require('express');
const { connection } = require('./config/db');
const cors = require('cors')
const { authentication } = require('./middlewares/authentication');
const { todosRouter } = require('./routes/todos.route');
const { usersRouter } = require('./routes/users.route');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Home');
});

app.use(cors({
    origin: "*"
}))

app.use('/users', usersRouter);
app.use(authentication)
app.use('/todos', authentication, todosRouter);

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connected to DB successfull");
    } catch (error) {
        console.log("Error while connecting to DB");
    }
    console.log("Server running on http://localhost:8080");
});

