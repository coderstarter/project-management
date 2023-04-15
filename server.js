const express = require('express');
const mongoose = require('mongoose')
const User = require('./model/userDataModel')
const app = express()

app.use(express.json())

app.post('/userdata', async (req, res) => {
    try {
        const userdata = await User.create(req.body);
        res.status(200).json(userdata);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message })
    }
})

app.get('/userdata', async (req, res) => {
    try {
        const userdata = await User.find({});
        res.status(200).json(userdata);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

app.get('/userdata/:createdAt', async (req, res) => {
    try {
        const { createdAt } = req.params;
        const userdata = await User.findOne({ createdAt })
        res.status(200).json(userdata);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//modify the data

app.put('/userdata/:start_date', async (req, res) => {
    try {
        const { id } = req.params;
        const userdata = await User.findByIdAndUpdate(id, req.body)
        if (!userdata) {
            return res.status(404).json({ message: 'Cannot find user by this ID' })
        }
        res.status(200).json(userdata);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//deletion

app.delete('/userdata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userdata = await User.findByIdAndDelete(id);
        if (!userdata) {
            return res.status(404).json({ message: 'Cannot find user by this ID' })
        }
        res.status(200).json(userdata)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/', (req, res) => {
    res.send('Working')
})



mongoose.connect('mongodb+srv://absep98:password@cluster0.rdz85ls.mongodb.net/UserData?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB is connected')
        app.listen(3000, () => {
            console.log('Server is up and running on PORT 3000')
        })
    })
    .catch((error) => {
        console.log(error)
    })
