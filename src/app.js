const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 

app.use(express.json())
app.use(express.urlencoded())

app.get('/restaurants', async (req,res)=>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants)
})

app.get('/restaurants/:id', async(req,res)=>{
    const id = req.params.id;
    const restaurant = await Restaurant.findByPk(id)
    res.json(restaurant)
})


app.post("/restaurants",async (req,res)=>{
    const body = req.body;
    const newRestaurant = await Restaurant.create(body) 
    res.json(newRestaurant)
})

app.put('/restaurants/:id', async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const restaurantToUpdate = await Restaurant.findByPk(id)
    const updatedRestaurant = await restaurantToUpdate.update(body)
    res.json(updatedRestaurant)
})

module.exports = app;