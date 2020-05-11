const express = require('express');
const Users = require('./userModel');
const validateUser = require('../middleware/validateUser')
const router = express.Router()

router.get('/', validateUser(), async (req, res, next) => {
    try {
        res.json(await Users.find()) //replaces var = await
    } catch(err) {
        next(err)
    }
})

module.exports = router;