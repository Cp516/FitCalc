var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'CalCount'
});

var newUser = function(name, email){
  // console.log('inside',name)
  connection.query("INSERT INTO user (name, email) VALUES (?, ?)", [name, email],function(err, results, fields){
    if(err){
      console.log(err)
    } else{
      console.log(results)
    }
  })
}

var addFoodItem = function(id, name, cals){
  console.log(id[0].id)
  connection.query("INSERT INTO food (description, calories, user) VALUES (?, ?, ?)", [name, cals, id[0].id], function(err, results, fields){
    if(err){
      console.log(err);
    } else{
      console.log(results);
    }
  })
}
var addWorkoutItem = function(id, name, cals){
  connection.query("INSERT INTO exercise (description, calories, user) VALUES (?, ?, ?)", [name, cals, id[0].id], function(err, results, fields){
    if(err){
      console.log(err);
    } else{
      console.log(results);
    }
  })
}

var oneUser = function(email, cb){
  connection.query("SELECT id FROM user WHERE email = ?", [email], function(err, results, fields){
    if(err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
  
}

var selectAllFood = function(id, callback) {
  connection.query('SELECT calories FROM food WHERE user = ?', [id[0].id], function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var selectAllExercises = function(id, callback) {
  connection.query('SELECT calories FROM exercise WHERE user = ?', [id[0].id], function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// module.exports.selectAll = selectAll;
module.exports.newUser = newUser;
module.exports.oneUser = oneUser;
module.exports.addFoodItem = addFoodItem;
module.exports.addWorkoutItem = addWorkoutItem;
module.exports.selectAllFood = selectAllFood;
module.exports.selectAllExercises = selectAllExercises;

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });