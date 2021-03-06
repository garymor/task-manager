const express = require("express");
const Mongoose = require('./db/mongoose.js')

const TaskDnC = require("./model/db_procedure.js")
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express() ;
const port =   process.env.PORT || 3000 ;


app.use(express.json())

app.use(userRouter);
app.use(taskRouter);


// const jwt = require('jsonwebtoken')

// const myFunction = () => {
//    const token =  jwt.sign( { _id:'abc123' } ,'thisismynewcourse',{expiresIn:'7 days'})
//    console.log(token)
//    console.log(jwt.verify(token,'thisismynewcourse'))
// }
// myFunction()


app.listen(port, () =>{
    console.log('server is runing on : ___' + port)
})

