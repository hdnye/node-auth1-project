const express = require('express');
const Users = require('./userModel');
const restrict = require('../middleware/validateUser')
const router = express.Router()

router.get('/', restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find()) //replaces var = await
    } catch(err) {
        next(err)
    }
})

module.exports = router;