const express = require('express')
const router = express.Router()
const Restaurant = require("../models/index")
const {check, validationResult} = require('express-validator')


router.get('/', async (req,res)=>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants)
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id)
    res.json(restaurant)
})


router.post("/", [check('name').not().isEmpty().trim(), check('location').not().isEmpty().trim(), check('cuisine').not().isEmpty().trim()],async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }else{
        const body = req.body;
        const newRestaurant = await Restaurant.create(body) 
        res.json(newRestaurant)
    }
})

router.put('/:id', async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const restaurantToUpdate = await Restaurant.findByPk(id)
    const updatedRestaurant = await restaurantToUpdate.update(body)
    res.json(updatedRestaurant)
})
router.delete('/:id', async(req,res)=>{
    const id = req.params.id;
    const restaurantToDelete = await Restaurant.findByPk(id)
    const deletedRestaurant = await restaurantToDelete.destroy()
    res.json(deletedRestaurant)
})


module.exports = router;