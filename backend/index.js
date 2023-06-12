const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');

const app = express();
const port=5000;
connectToMongo();
var authenticate = require("./routes/auth");
var notes = require("./routes/notes");
var login = require("./routes/login");
var getUser = require("./routes/getUser");

app.use(cors());
app.use(express.json());
app.use('/api/auth/createUser',authenticate);
app.use('/api/notes',notes);
app.use('/api/auth/login',login);
app.use('/api/auth/getUser',getUser);

app.listen(port,()=>{
    console.log("listening at port 5000");
})