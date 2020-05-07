const db = require('../data/config')
const bcrypts = require('bcryptjs')

module.exports = {
    find, 
    findBy,
    findById,
    add
    
}

async function find() {
    return db('users')
        .select('id', 'username')
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter)
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where({ id })
        .first()
}

async function add(user) {
    user.password = await bcrypts.hash(user.password, 13)
    const [id] = await db('users').insert(user)
    return findById(id)
}