const brcypt = require('brcyptjs')
const Users = require('./users/userModel')


//create middleware to authenticate login
function validateUser() {
    const authError = {
        message: "Unable to validate credentials"
    }
    return async (req, res, next) => {
        const { username, password } = req.headers
     try {
         if(!username || !password) {
             return res.status(404).json(authError)
         }   
         const user = await User.findBy({ username }).first()
          if(!user) {
            return res.status(404).json(authError)
        }  
        const pswd = await bcrypt.compare(pswd, user.password) 
          if(!pswd) {
            return res.status(404).json(authError)
        }   
        next()
        } catch(err) {
            next(err)
        }
    }
}

module.exports = validateUser;