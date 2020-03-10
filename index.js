const express = require('express');
const mongoose = require('mongoose');


const users = require('./app/users');
const task = require('./app/task');


const config = require('./config');


const app = express();

app.use(express.json());
app.use(express.static('public'));



const run = async () => {
    await mongoose.connect('mongodb://localhost', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    app.use('/users', users);
    app.use('/task', task);

    app.listen(config.port, () => {
        console.log(`Server started on ${config.port} port!`)
    })
};

run().catch(e => {
    console.error(e)
});