require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const main = require('./controllers/main-controller')



const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express();
app.use(express.json());

app.use(
    session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/register', main.register)
app.post('/login', main.login)
app.get('/getuser', main.getUser)
app.get('/logout', main.logout)
app.post('/newproject', main.addProject)
app.post('/newtask', main.addTask)
app.post('/updatetask', main.updateTask)



massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected')
    app.listen(SERVER_PORT, () => console.log(`Now arriving at ${SERVER_PORT}`))
})