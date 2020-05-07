const express = require('express');
const Users = require('./userModel');

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        res.json(await Users.find()) //replaces var = await
    } catch(err) {
        next(err)
    }
})

module.exports = router;