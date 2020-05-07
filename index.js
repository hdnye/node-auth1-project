server = require('./server');

port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})