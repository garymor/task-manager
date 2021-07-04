const express = require('express');
const router = new express.Router();
const User = require('../models/user')
const mongoose = require('mongoose');
router.get('/test',(req,res) =>{
    res.status(200).send(req.method +":" +req.url)
})



router.post("/users",(req,res)=>{
    const user = new User(
        req.body);
        user.save()
        .then(val => {
            res.status('200').send('saved' + val)  
        })
        .catch(err => {
            console.log(err)
            res.status('400').send(err)   
        })

    console.log(req.body)
})


router.post("/users/login", async (req,res) =>{

    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        res.send(user)
    } catch(err){
        res.send(err);
    }

})


router.get("/users/:id",(req,res) =>{
    const _id = req.params.id ;  
    User.findById(_id)
    .then(val => {
      if (val) { 
          res.send(val);
      } 
      else {
          res.status(404).send("user not found")
      }
    })
    .catch(err => res.status('404').send(err))
})

router.get("/users",(req,res) => { 
    //const Users = Mongoose.mongoose.models.User;
     User.find({}).then(val=> {
    //Users.find({}).then(val=> {
        res.status('201').send(val)
    }).catch(val => {
        res.status('404').send(val)
    })
})
router.patch("/users/:id", async(req,res) => {
  
    try{
        const _id = req.params.id ; 
        const updateArr = Object.keys(req.body);
        const allwoedArr = Object.keys(User.schema.obj);
        
        AllowedallwoedArr = allwoedArr.filter( (val) => val != "email" )
        const isvalidOperation = updateArr.every(val =>{
            return AllowedallwoedArr.includes(val)
        })
    
        if (!isvalidOperation) return res.status(400).send("field canot be updated")
       
        const user = await User.findById(_id)
        updateArr.forEach( key => user[key] = req.body[key]
        )
        await user.save(); 
    
    if(!user) return res.status(404).send()
        res.status(200).send(user)
    } catch(err){
        res.status(400).send(err)

    }
})

router.delete("/users/:id",async (req,res) => {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete(_id,{useFindAndModify:false})
    if(!user)  return res.status(400).send()
    const countU =  await User.find({}).count();
    res.status(200).send(`${user} has been deleted \n count is now on : ${countU}`)
})






module.exports = router;
