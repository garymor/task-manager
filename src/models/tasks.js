
const mongoose = require('mongoose')

const Task = mongoose.model('Task',new mongoose.Schema({
            description:{
                type:String,
                trim:true,
                require:true
            },
            completed:{
                type:Boolean,
                require:false,
                default:false
            }
        })
      )

      module.exports = Task;