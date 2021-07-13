const jwt = require('jsonwebtoken')
const { promisify} = require('util')

const AuthConfig = require('../config/auth')

module.exports = {
    async auth(req,res,next){
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({error:"não há token"})
        }
        const [,token] = authHeader.split(" ")

        try {
            const decoded = await promisify(jwt.verify)(token, AuthConfig.secret)
            req.user = decoded
            return next()
        } catch (error) {
            return res.status(401).json({error:"token inválido"})

            
        }
    }
}