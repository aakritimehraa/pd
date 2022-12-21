require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/user' , userRouter)
app.use('/api/notes' , noteRouter)



app.get('/' , (req , res)=>{
    res.send('hello')
})

const PORT = process.env.PORT
app.listen(PORT , () => {
    console.log('sever is running on port num' , PORT)
})

const URI = process.env.MONGODB
mongoose.connect(URI , {

} , err => {
    if(err) throw err
    console.log('connected to mongodb')
})