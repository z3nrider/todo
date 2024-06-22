const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose');
const Todo = require('./models/todos');
const dbURI = "mongodb+srv://bkoehler2012:H32ff9iXk5ef7KyO@cluster0.y5ex7mx.mongodb.net/todoapp?retryWrites=true&w=majority&appName=Cluster0";

// Connect to db and start server if successful
mongoose.connect(dbURI)
    .then ((result) => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        })
    })
    .catch((err) => { console.log(err) });

app.use(express.static(__dirname + ""));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.get('/create-todo', (req, res) => {
    const todo = new Todo({
        task: 'mow the yard',
        dueDate: 'june 23rd',
    });
    todo.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/all-todos', (req, res) => {
    Todo.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/single-todo', (req, res) => {
    Todo.findById('667619f4c02c2c89076b1b13')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
});


