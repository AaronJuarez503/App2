const jwt = require('jsonwebtoken');

module.exports={

    generarToken:function(payload) {
        return jwt.sign(payload,'buy787by87y87y87y87y878y7y7y',{ expiresIn:'20m'});
    },

    refreshToken:function(payload2) {
        return jwt.sign(payload2,'buy787by87y87y87y87y878y7y7y',{ expiresIn:'30m'});
    },

    
    validarToken2:function (token) {
        return new Promise((resolve, reject) => {
            if (!token) {
                return reject(new Error('Token does not exist.'));
            }

            try {
                jwt.verify(token,'buy787by87y87y87y87y878y7y7y', (err, decoded) => {
                    if (err) {
                        if (err.name === 'TokenExpiredError') {
                            
                            return reject(new Error('Token has expired.'));
                        }
                        if (err.name === 'JsonWebTokenError') {
                            return reject(new Error('Token is altered.'));
                        }
                        return reject(new Error('Token verification failed.'));
                    }
                    resolve(decoded)
                });
                
            } catch (error) {
                throw error;
                
            }
    
           
        });
    }



}