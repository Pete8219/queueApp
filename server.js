const http = require('http')
const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT || 8080



const server = http.createServer(app)




server.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})