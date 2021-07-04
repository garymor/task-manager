// CRUD 

const {MongoClient,ObjectId} = require ('mongodb')

const test = require('assert');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true},(err,client) =>{
    test.strictEqual(null,err);
    
    const db = client.db(databaseName)
   
    // let crrntcrst = {} 
    // db.collection('tasks').find({description:"REDUX! time"},(err,result)=> {
    //     test.strictEqual(null,err)
    //     result.toArray().then(val => {console.log(val)})
    //     crrntcrst = result ;
    // })
    // crrntcrst.count().then(val => {console.log(` cursor num of find : ${val}`)})
    
    let updateCollection = (collectName,Ofilter,Oupdate) => {
        db.collection(collectName).updateOne(Ofilter,Oupdate,(err,result)=>{
            test.strictEqual(null,err)
            console.log(result)
        })
    }

    let removeCollection = (collectName,Ofilter) => {
        db.collection(collectName).removeOne(Ofilter).then(result =>{
            console.log(result)
        }).catch(err => console.log(err))
            
        }
    
    removeCollection('users',{_id:new ObjectId("60db3179494d6d133ed5b5a3")})

    //updateCollection('tasks',{description:"REDUX! time"},{$set: {description:"mobyx! time"}})
   // updateCollection('users',{_id: new ObjectId("60db314d0ac26113067f11f9")},{$inc:{age:1}})

//     let documents = [
//         {
//             description:"grass cut time",
//             completed:false
//         }
//        ,
// ]
//     let callback = (err,result) => {
//         test.strictEqual(null,err)
//         console.log(result)
//     }
//     let insertMany = (collectName,documents) => {
//         db.collection(collectName).insertMany(documents,{ordered:true},callback)
//     }
//     insertMany("tasks",documents)
//     //insertMany("tasks",documents).then(val => console.log(`the tasks collection had updated - ${val}`))
//
 })








