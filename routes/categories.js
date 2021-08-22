const Joi = require('joi')
const express = require('express')

const router = express.Router()

router.use(express.json())

let categories = [
    {_id: "1", name: 'novel'},
    {_id: "2", name: 'fiction'},
    {_id: "3", name: 'science'},
    {_id: "4", name: 'mistery'},
]


router.get('/', (req,res) => {
    res.send(categories)
})


router.post('/', (req,res) => {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const {error} = schema.validate({name: req.body.name})
    if (error) {
        res.status(400).send('name is required and must be at least 3 characters')
        return
    }

    const id = categories.length + 1
    const name = req.body.name

    categories.push({'_id': id, 'name':name})
    res.send(categories)
})


router.put('/:id', (req, res) => {
    // console.log(typeof req.params.id)
    let foundCategory = categories.find(item => item._id === req.params.id)
    console.log(foundCategory)

    if (!foundCategory) {
        res.status(404).send('the course with the given id does not exist')
        return
    }

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const {error} = schema.validate({name: req.body.name})
    if (error) {
        res.status(400).send('invalid name tp update the course')
        return
    }

    foundCategory.name = req.body.name
    res.send(foundCategory)
})


router.delete('/:id', (req,res) => {
    let foundCategory = categories.find(item => item._id === req.params.id)
    console.log(foundCategory)

    if (!foundCategory) {
        res.status(404).send('the course with the given id does not exist')
        return
    }

    res.send(categories.filter(item => item._id !== req.params.id))
})


module.exports = router