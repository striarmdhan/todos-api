require('dotenv').config();
const express = require('express');
const userRouter = require('./routes/user.route');
const todosRouter = require('./routes/todos.route');
require('./middlewares/passport');

const app = express();
const PORT = process.env.PORT; //running port yang sudah kita deklarasi

app.use(express.json());
app.use('/user', userRouter);
app.use('/todos', todosRouter);

app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`)
})