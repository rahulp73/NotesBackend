require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
mongoose.set('strictQuery', true)
app.use(cors({
    origin: true,
    optionsSuccessStatus: 204,
    credentials : true
}))
app.use(express.static(__dirname + '/images'))

app.use("",require('./router/routes'))


const startServer = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected To Database...")
        app.listen(port,()=>{
            console.log(`Listening at PORT ${port}`);
        })
    } catch(err) {        
        console.log("Error : ",err.message)
    }
}

startServer()