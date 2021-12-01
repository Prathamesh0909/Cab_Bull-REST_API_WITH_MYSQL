const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("Authorization");
        if (token) {
            token = token.slice(7);
            verify(token, "0909abc",(err, decoded) => {
                if (err){
                    res.json({
                        success: 0,
                        message: "Invalid Token"
                    });
                } else { 
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access Denied! Unauthorised User"
            });
        }
    }
};