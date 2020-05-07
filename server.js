const express = require('express')
const helmet = require("helmet")
const cors = require("cors")
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const userRouter = require('./users/userRouter');
const authRouter = require('./auth/authRouter');
const config = require('./data/config');


const server = express()

//Middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session({
    name: 'token',
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || 'secret',
    store: new KnexSessionStore({
        knex: config, //config file 
        createTable: true, //if session table doesn't exist
    })
}));

//Routers
server.use('/auth', authRouter);
server.use('/users', userRouter);

module.exports = server;