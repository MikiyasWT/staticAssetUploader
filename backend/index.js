
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser')
const mongoose= require('mongoose');
const songsRouter = require('./routes/songs');
require('dotenv').config();






//defining middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/songs',songsRouter)

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,
    {useNewUrlParser:true},
    {useCreateIndex:true},
    {autoIndex: true})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Connected to Mongo db Atlas")
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`app running on http://localhost:${PORT}`)
})