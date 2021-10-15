const jwt  = require('jsonwebtoken')
const ApiError = require('../exceptions/api-error')
const dotenv = require("dotenv")

dotenv.config()

module.exports = (req, res, next) => {

    if(req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
        

         if(!token) {

            //return res.redirect(401, '/auth/zhilye')
            
             return res.status(401).json({
                message:'Нет авторизации' 
            }) 
        } 

        const decoded = jwt.verify(token, process.env.SECRET)
        //console.log(decoded)

        req.user = decoded

        //console.log(req.user)
        next()
        

    } catch(e) {
         
       
        throw  ApiError.UnautorizedError()

    }
}