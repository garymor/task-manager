const mongoose = require('mongoose')
const Task = require("../models/tasks")

async function taskDeleteNcount(id){
await Task.findByIdAndDelete(id).then(()=> console.log('id deleted'));
let response = await Task.find({});
return response;
}

exports.taskDnC = taskDeleteNcount;

