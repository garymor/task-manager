const express = require('express')
const router = new express.Router()
const Task = require('../models/tasks')
//const Mongoose = require('./db/mongoose.js')


router.post("/tasks",(req,res) => {
    const task = new Task(req.body);
    task.save().then(val =>{
        res.status("201").send("new task been saved" + val)
    }).catch(err => {
        res.status('400').send(err.errors)
    })
})

router.get("/tasks",(req,res) => {
    //const Tasks = Mongoose.mongoose.models.Task;
     Task.find({}).then(val=> {
        res.status('201').send(val)
    }).catch(val => {
        res.status('404').send(val)
    })
})

router.get("/tasks/:id",(req,res) =>{
    const _id = req.params.id ;  
    Task.findById(_id)
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

router.get("/tasks/taskDnC/:id",async (req,res)=>{
   let response =  await TaskDnC.taskDnC(req.params.id,res)
   res.status('201').send(response)
})

router.patch("/tasks/:id" , async (req,res) => {
    const _id = req.params.id;
    try{
        
        //let task = await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true});
        
        let task = await Task.findById(_id)

        req.paramas.body.forEach(element => {
            task[element] = req.paramas.body[element]
        });
        await task.save()
        if(!task) return res.status(400).send()
        res.status(200).send(task)
    } catch(err){
        res.status(400).send(err)
    }
})


router.delete("/tasks/:id",async (req,res) => {
    const _id = req.params.id;
    const task = await Task.findByIdAndDelete(_id)
    if(!task)  return res.status(400).send()
    const countU =  await Task.find({}).count();
    res.status(200).send(`${task} has been deleted \n count is now on : ${countU}`)
})







module.exports = router