"use strict"//para que nao seja incorporado no windows
var express = require('express');
var router = express.Router();

const Task = require('../models/task');



/* GET home page. */
router.get('/tasks',  async function(req, res, next) {
// await Task.create({
//   title: 'Nome da Tarefa',
//   categoria: 'Testando',
//   textarea :'Modulo de testes',
//   descricao: 'Test'
// });


  let tasks = await Task.find();
  res.send(JSON.stringify(tasks));
});

router.delete('/tasks/id',  async  (req, res) =>{
  /*
  usou a rota-> '/tasks'
Task.remove({_id: req.query.id},(err)=>
if(!err){
  res.send(req.body)
}else{
  res.send(err)
})
  */
  
  let tasks = await Task.findOneAndDelete(req . params . id);
  res.send(JSON.stringify(tasks));

});


/* PUT ONE customer. atualizar tarefa */



router.put('/tasks', async (req, res, next)=> {

let task = new Task(req.body.task)
await Task.findOneAndUpdate( {_id: req.body.task} , {$set: req.body.task}, {new:true}, (err, task) =>{
     
      if (!err) {
        res.send(task);
        
          
      }else{
        res.send(err);
      }
    
  });
  

  console.log(task);
  

});

router.put('/tasks/atualizar',  async(req, res , next)=>{
  let tasks = await Task.findByIdAndUpdate({status: false} );
  res.send(JSON.stringify(tasks));
})

router.get('/tasks/counter',  async(req, res , next)=>{
  let tasks = await Task.find({status: req.query.type});
  res.send(JSON.stringify(tasks.length));
})

router.post('/tasks',(req, res , next)=>{
  
  let task =   new Task(req.body.task) ;
  task.save((error)=>{
    error ? res.send(error) : res.send(task);
  })

})



module.exports = router;
