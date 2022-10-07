require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const user = require('./routes/user');

app.use('/', user);

module.exports = app;