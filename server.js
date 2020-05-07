const express = require('express')
const helmet = require("helmet")
const cors = require("cors")
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)

const server = express()

//Middleware
server.use(express.json());
server.use(helmet());
server.user(cors());
server.use(session({
    name: 'token',
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || 'secret',
    store: new KnexSessionStore({
        //config file 
        createTable: true, //if session table doesn't exist
    })
}));

//Routers

module.exports = server;