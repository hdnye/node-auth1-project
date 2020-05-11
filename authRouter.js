const express = require('express')
const Users = require('./users/userModel')
const bcrypt = require('bcrypts')
const restrict = require('./middleware/validateUser')
const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const { username } = req.body
        const user = await Users.findBy({ username }).first()
        if(user) {
            return res.status(409).json({
                message: 'That username is already in use'
            })
         } 
        //   else { //might need the else stmt
             res.status(201).json(await Users.add(req.body))
        //  }

    } catch(err) {
        next(err)
    }
})
//why is this a post request?
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Users.findBy({ username }).first()

        const validatePswd = await bcrypt.compare(password, user.password)
        if(!user || !validatePswd) {
            return res.status(401).json({
                message: 'Invalid Credentials',
            })
        }
        //returns a res.header of set-cookie & sets the token to a special encrypted session id
        //req.session.user = user
        res.json({
            message: `Welcome ${user.username}`
        })

    } catch(err) {
        next(err)
    }
})

// router.get('/logout', restrict(), (req, res, next) => {
//     res.session.destroy((err) => {
//         if(err) {
//             next(err)
//         } else {
//             res.json({
//                 message: 'Successfully logged out'
//             })
//         }
//     }
//     )
// })


module.exports = router;
