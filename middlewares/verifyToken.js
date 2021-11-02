// Verify Token
function verifyToken(req, res, next){
    // Get auth header value
    const bearerHeader = req.headers['authorization']
    // console.log(bearerHeader);
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined'){
        // Split bearer at the space
        const bearer = bearerHeader.split(' ')
        // Get token from array
        const bearerToken = bearer[1]
        // Set token
        req.token = bearerToken //adding token in req object
        // Next Middleware
        next()
    }   
    else{
        // Forbidden
        res.sendStatus(403)
    }
}

module.exports = {
    verifyToken
}