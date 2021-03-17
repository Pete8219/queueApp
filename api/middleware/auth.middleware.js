const jwt  = require('jsonwebtoken')

module.exports = (req, res, next) => {

    if(req.method === 'OPTIOINS') {
        return next()
    }

    try {
        const token = req.headers.authorization.spli(' ')[1] // "Bearer TOKEN"
        if(!token) {
            return res.status(401).json({
                message:'Нет авторизации'
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded
        next()

    } catch(e) {
        return res.status(401).json({
            message:'Нет авторизации'
        })
    }
}