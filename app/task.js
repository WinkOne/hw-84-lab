const express = require('express');
const Task = require('../model/Task');
const User = require('../model/User');

const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {

    const user = req.user;

    const task = new Task(req.body);

    task.status = 'new';
    task.user = user._id;

    await task.save();

    res.send(task);
});

router.get('/', auth, async (req, res) => {

    const user = req.user;

    const tasks = await Task.find({user: user._id});

    res.send(tasks);
});

router.put('/:id', auth, async (req, res) => {

    const user = req.user;

    const task = await Task.findOne({_id: req.params.id});

    if(user._id.toString() !== task.user.toString()){
       return res.status(401).send({message: "Not Authorization"})
    }

    const tasks = await Task.updateOne({_id: req.params.id}, {status: "in_progress", title: req.body.title, description: req.body.description, user: user._id});

    res.send(tasks);
});

router.delete('/:id', async (req, res) => {
    await Task.deleteOne({_id: req.params.id});
    res.send("deleted")
});

module.exports = router;