// implement your API here
// console.log(`I am woring`);

const express = require('express');
const server = express();
const databass = require('./data/db.js');

server.use(express.json());

//----------------home route
server.get('/', ( req, res ) => {
    res.send(`It is working`)
})

//----------------------get users
server.get('/users', (req, res) => {
    databass.find()
    .then(user => res.status(200).json(user))
    .catch(err => {
        console.log(`error on GET /users`, err)
        res.status(500).json({
            error: "The users information could not be retrieved." 
        })
    })
})

//-----------------------------get users by id number
server.get('/users/:id', (req, res) => {
    const id = req.params.id;

    databass.findById(id)
    .then(userID => res.status(200).json(userID))
    .catch(err => {
        console.log(`error on GET /users/:id`, err)
        res.status(500).json({
            errormessage: "The user with the specified ID does not exist."
        })
    })
})

//----------------------------------post user data in databass
server.post('/users', (req, res) => {
    const newData = req.body;

    databass.insert(newData)
    .then(newUser =>{
        res.status(201).json(newUser)
    })
    .catch(err => {
        console.log(`error on POST /user`, err)
        res.status(500).json({
            errorMessage: 'error adding a new user'
        })
    })
})

//-----------------------------------delete a user from the databass
server.delete('/users/:id', (req, res) => {
    const id = req.params.id;

    databass.remove(id)
    .then(user => {
        if(user){
            res.status(200).json({message: `the ${id} user was remove`})
        }else{
            res.status(404).json({
                message: "there are no alien here"
            })
        }
    })
    .catch(err => {
        console.log(`error on DELETE /user/:id`, err)
        res.status(500).json({
            errorMessage: 'error on removing a user from databass'
        })
    })

})

//----------------------------------------update a user data in the databass
server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    databass.update(id, updateData)
    .then(updateUser => {
        res.status(200).json(updateUser)
    })
    .catch(err => {
        console.log(`error on PUT /users/:id`, err)
        res.status(500).json({
            errorMessage: "The user information could not be modified."
        })
    })
})


const port = 4000;
server.listen(port, () => console.log(`I am working in background on ${port}`))

