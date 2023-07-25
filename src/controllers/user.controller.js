const userService = require('../services/user.service') //mengambil dari file lain
const jwt = require('jsonwebtoken');

const register = async (request, response) => {
    const {body} = request;

    if(!body.username || !body.email || !body.password){
        return response.status(400).json({
            status: 'failed',
            message: 'invalid data'
        });
    }

    try{
        const user = await userService.getUserbyEmail(body.email);
        
        if(user[0][0]){
            return response.status(409).json({
                status: 'failed',
                message: 'your email has been used'
            })
        }

        await userService.register(body);

        return response.status(201).json({
            status: 'SUCCESS',
            message: 'your data has been saved :D'
        });
    }catch (error){
        return response.status(500).json({
            status: 'failed',
            message: 'system failed to save your data :('
        })
    }
}

const login = async (request, response) => {
    const {body} = request;

    if(!body.email || !body.password){
        return response.status(400).json({
            status: 'failed',
            message: 'email and password cannot be empty!'
        });
    }
    try{
        const user = await userService.login(body);

            if(!user){
                return response.status(400).json({
                    status: 'failed',
                    message: 'email and password is wrong'
                })
            }
            
            const dataUser = user [0][0];
            
            const jwtToken = jwt.sign(
                {id: dataUser.id, email: dataUser.email},
                process.env.JWT_SECRET
            )

        return response.status(200).json({
            status: 'SUCCESS',
            message: 'login success',
            token: jwtToken,
            data: dataUser
        });
    }catch (error){
        return response.status(500).json({
            status: 'failed',
            message: 'unable login to the system'
        })
    }    
}

const update = async (request, response) => {
    const id = request.user[0][0].id;
    const {body} = request;

    if (!body.username || !body.email || !body.password){
        return response.status(400).json({
            status: 'failed',
            message: 'failed to update your data'
        });
    }

    try{
        await userService.update(id, body);
        
        return response.status(200).json({
            status: 'SUCCESS',
            message: 'success updated your data :D'
        })
    }catch(error){
        return response.status(500).json({
            status: 'failed',
            message: 'unable to update your data :('
        })
    }
}

const viewUsers = async (request, response) => {
    try{
        const [user] = await userService.viewUsers()

        return response.status(200).json({
            status: 'SUCCESS',
            message: 'view data',
            data: user
        })
    }catch(error){
        return response.status(500).json({
            status: 'failed',
            message: 'failed to view data'
        })

    }
} 

const deleteUser = async (request, response) => {
    const id = request.user[0][0].id;

    try{
        await userService.deleteUser(id)

        return response.status(200).json({
            status: 'success',
            message: 'data has been deleted'
        })
    }catch(error){
        console.log(error)
        return response.status(500).json({
            status: 'failed',
            message: 'data cannot be delete'
        })
    }
}
module.exports = {
    register, 
    login, 
    update, 
    viewUsers, 
    deleteUser};