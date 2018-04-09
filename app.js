const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const { Todo } = require('./models');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());

app.get('/', async (req, res) => {
    let todos = await Todo.findAll();
    res.json(todos);
});

app.post('/', async (req, res) => {
    try{
        let todo = await Todo.create({ text: req.body.text });
        res.json(todo.toJSON());
    }catch(err){
        res.status(400);
        res.json({ message: err.message });
    }
})

app.patch('/', async (req, res) => {
    try{
        let todo = await Todo.findById(req.body.id);
        todo = await todo.update({ completed: !todo.completed});
        res.json(todo.toJSON());
    }catch(err){
        res.status(400);
        res.json({ message: err.message });
    }
});

app.delete('/', (req, res) => {
    Todo.destroy({
        truncate: true
    }).then( () => {
        res.status(200);
        res.send()
    });
});

app.listen(3000, () => {
    console.log('App running on port 3000');
});