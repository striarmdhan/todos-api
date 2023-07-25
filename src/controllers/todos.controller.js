const todosService = require('../services/todos.service')

const create = async (request, response) => {
    const userId = request.user[0][0].id;
    const {body} = request;

    if(!body.title || !body.description || !body.deadline){
        return response.status(400).json({
            status: 'failed',
            message: 'invalid data'
        });
    }

    try{
        await todosService.create(userId, body);

        return response.status(201).json({
            status: 'SUCCESS',
            message: ':D'
        })
    }catch(error){
        console.log(error)
        return response.status(500).json({
            status: 'failed',
            message: 'system failed to save your data'
        })
    }
}

const viewOneTodos = async (request, response) => {
    const userId = request.user[0][0].id;
    const id = request.params.id;
    try{
        const todos = await todosService.viewOneTodos(id, userId)

        return response.status(200).json({
            status: 'SUCCESS',
            message: 'viewing data',
            data: todos[0][0]
        })
    }catch(error){
        console.log(error)
        return response.status(500).json({
            status: 'failed',
            message: 'failed to view data'
        })
    }
}

const viewTodos = async (request, response) => {
    const userId = request.user[0][0].id;
    try{
        const todos = await todosService.viewTodos(userId)

        return response.status(200).json({
            status: 'SUCCESS',
            message: 'viewing data',
            data: todos[0]
        })
    }catch(error){
        return response.status(500).json({
            status: 'failed',
            message: 'failed to view data'
        })
    }
}

const update = async (request, response) => {
    const userId = request.user[0][0].id;
    const id = request.params.id;
    const {body} = request;

    if(!body.title || !body.description || !body.deadline){
        return response.status(400).json({
            status: 'failed',
            message: 'failed to update your data'
        })
    }

    try{
        await todosService.update(id, userId, body)

        return response.status(200).json({
            status: 'SUCCESS',
            message: 'success updated your data :D'
        })
    }catch(error){
        return response.status(200).json({
            status: 'failed',
            message: 'unable to update your data :('
        })
    }
}

const deleteTodos = async (request, response) => {
    const id = request.params.id;
    const userId = request.user[0][0].id;
    try{
        await todosService.deleteTodos(id, userId)

        return response.status(200).json({
            status: 'SUCCESS',
            message: 'data has been deleted'
        })
    }catch(error){
        return response.status(500).json({
            status: 'failed',
            message: 'data cannot be delete'
        })
    }
}

module.exports = {
    create,
    viewOneTodos,
    viewTodos,
    update,
    deleteTodos
}