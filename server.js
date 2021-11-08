const express = require('express')
const app = express()
const cors = require('cors')
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/auth')
const file = require("./routes/file");
const connectDb = require('./database/connect')
const path = require("path")
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()







app.use(cors())
app.use(express.json())

app.use('/', express.static(path.join(__dirname, '/client/build')));
app.use('/api/v1/blogs',blogRoute)
app.use('/api/user',authRoute)
app.use("/file", file);



app.use(errorHandlerMiddleware)

app.get('',(req,res)=>{
    res.status(404).send("Route not found")
})

const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port,console.log(`Listening on port : ${port}`))
    } catch (error) {
        console.log(error)
    }
}


// Right before your app.listen(), add this:
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
  });

start()