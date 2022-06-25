const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
function testMiddleware() {
return  (req, res, next) => {
 
  
    try {
       
        const token = req.body.token || req.query.token || req.headers["token"]
        if (!token) {
        return res.status(403).send("Access denied.");
        }
        const decoded = jwt.verify(token, TOKEN_SECRET);
        req.user = decoded;
       
    } catch (error) {
       return res.status(400).send("Invalid token");
    }
    return next();
}
}

module.exports = testMiddleware