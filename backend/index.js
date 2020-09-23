require('dotenv').config();
const express = require('express');
var path = require('path');
var mongo=require('./mongodbconnection');
var bcrypt = require('bcryptjs')
bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
cors = require('cors');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
mongo.connectDatabase()
let refreshtokens = [];

app.use('/User',require('./routes/User'))

const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});