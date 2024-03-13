const jwt = require('jsonwebtoken');

const PRIVATE_KEY = 'ThisIsOurSecret';

const generateToken = (user)=>{
    delete user.password; 
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn:'24h'})
    return token; 
}

const authToken = (req, res, next) =>{

    const authHeader = req.headers.authorization; 
    if(!authHeader){
        return res.status(401).send({status:'error', error:'not authenticated'})
    }

    //authorization: 'bearer asdjalsdhaskdhas'
    const token = authHeader.split(' ')[1]
    
    jwt.verify(token, PRIVATE_KEY, (error, credentials)=>{
        if(error){
            return res.status(403).send({status:'error', error:'Not authorized'})
        }

        req.user =  credentials.user;
        next()
    })

} 

module.exports = {
    generateToken, 
    authToken
}