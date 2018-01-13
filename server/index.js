var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mysql');
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser())


app.post('/user', function(req, res){
  console.log(req.body)
  items.newUser(req.body.user, req.body.email, ()=>{console.log('success!!')})
  console.log('inside of the server ', req.body.user)
  res.send(req.body.email);
})

app.post('/foodItem', function(req, res){
  console.log(req.body)
  items.oneUser(req.body.userId, (err, results)=>{
    if(err){
      console.log(err)
    }else{
      items.addFoodItem(results, req.body.name, req.body.cals)
    }
  })
  res.send();
})
app.post('/workoutItem', function(req, res){
  console.log(req.body)
  items.oneUser(req.body.userId, (err, results)=>{
    if(err){
      console.log(err)
    }else{
      items.addWorkoutItem(results, req.body.name, req.body.cals)
    }
  })
  res.send();
})

app.get('/userfooddata', function (req, res) {
  console.log(req.query.userId)
  items.oneUser(req.query.userId, (err, results)=>{
    if(err){
      console.log(err)
    }else{
      console.log(results)
      items.selectAllFood(results, (err, results)=>{
        if(err){
          console.log(err)
        }else{
          res.send(results);
          console.log(results)
        }
      })
    }
  })
  
});

app.get('/userworkoutdata', function (req, res) {
  console.log(req.query.userId)
  items.oneUser(req.query.userId, (err, results)=>{
    if(err){
      console.log(err)
    }else{
      console.log(results)
      items.selectAllExercises(results, (err, results)=>{
        if(err){
          console.log(err)
        }else{
          res.send(results);
          console.log(results)
        }
      })
    }
  })
  
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

