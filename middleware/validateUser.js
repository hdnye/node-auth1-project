const bcrypt = require('bcryptjs');
const Users = require('../users/userModel');

function restrict() {
    const authError = {
        message: 'Invalid Credentials'
    }
    return async (req, res, next) => {
        try {
            const { username, password } = req.headers
            if(!username || !password) {
                return res.status(401).json(authError)
            }
            const user = await Users.findBy({ username }).first()
            if(!user) {
                return res.status(401).json(authError)
            }
            const pswdValid = await bcrypt.compare(password, user.password)
            if(!pswdValid) {
                return res.status(401).json(authError)
            }
            next()
        } catch(err) {
            next(err)
        }
    }
}

module.exports = restrict;





// function validateUser() {
//     const authError = {
//         message: 'Invalid Credentials'
//     }

//     return async (req, res, next) => {
//         try {
//             if(!req.session || !req.session.user) {
//                 res.status(401).json(authError)
//             }
//             next()
//         } catch(err) {
//             next(err)
//         }
//     }
// }

// module.exports = {
//     validateUser
// }