const dbPool = require('../config/database');

const create = async(userId, body) => {
    const query = `INSERT INTO todos(user_id, title, description, deadline) VALUES (${userId}, '${body.title}', '${body.description}', '${body.deadline}')`

    return dbPool.execute(query);
}

const getTodosbyTitle = async (title, userId) => {
    const query = `SELECT todos_id, title FROM todos WHERE title = '${title}' AND user_id = ${userId}`

    return dbPool.execute(query);
}

const viewOneTodos = async (id, userId) => {
    const query = `SELECT * FROM todos WHERE id = ${id} AND user_id = ${userId}`

    return dbPool.execute(query);
}

const viewTodos = async (userId) => {
    const query = `SELECT id, title, description, deadline FROM todos WHERE user_id = ${userId}`

    return dbPool.execute(query);
}

const update = async (id, userId, body) => {
    const query = `UPDATE todos SET title = '${body.title}', description = '${body.description}', deadline = '${body.deadline}' WHERE id = ${id} AND user_id = ${userId}`

    return dbPool.execute(query);
}

const deleteTodos = async (id, userId) => {
    const query = `DELETE FROM todos WHERE id = ${id} AND user_id = ${userId}`

    return dbPool.execute(query);
}

module.exports = {
    create,
    getTodosbyTitle,
    viewOneTodos,
    viewTodos,
    update,
    deleteTodos
}