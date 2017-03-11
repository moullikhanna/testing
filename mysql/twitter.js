var FetchTweets = require('fetch-tweets'); // Include the module 
var async = require('async');
var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser());
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'testing'
});
var app = express();
connection.connect(function(err){
if(!err) {
    console.log("Database is connecteds");    
} else {
    console.log("Error connecting database ... nn");    
}
});


// Specify Twitter keys (preferably in an external .gitignore'd file) 
var apiKeys = {
      consumer_key:         'pQsYK3gYev8XttrCB5yDofoae',
  consumer_secret:      'FJiecXYSrdBH8QzB0mKOWvi8eroDJpxk9q1aHbZJbWleW82beU',
  access_token:         '785066508070203392-rO55JnkXzz8qBxhPVzuV34d2q0omOby',
  access_token_secret:  '7o6mQ55AmrCtQbtbz5Hg7zgt2rqqgSsp82n3sC0AcWBcx'};

// Create a new object and pass in keys and optional additional options (see below) 
var fetchTweets = new FetchTweets(apiKeys); 


 async.series([ 
   function(callback)
   {
      var name="NARENDER_MODI";
      var id=1;
fetchTweets.byTopic('narender_modi', function(results){
 // console.log(results);
  for(var i=0;i<12;i++)
{
   console.log(results[i].body);
   connection.query("insert into tweets values('" + id + "','" + name + "','" + results[i].body  + "')", function(err,data)
   {
 if(err)
  console.log(err)
   
});
}
callback(null,results) 
});},
  function(callback)
   {
      var name="STEVE_JOBS";
      var id=2;
fetchTweets.byTopic('steve_jobs', function(results){
  for(var i=0;i<12;i++)
{
   console.log(results[i].body);
   connection.query("insert into tweets values('" + id + "','" + name + "','" + results[i].body  + "')", function(err,data)
   {
 if(err)
  console.log(err)
  else 
  console.log(data);
});
}
callback(null,results) 
});
}, function(err,results)
 {
   if(err)
   console.log(err)
  
 
 }]);

 app.post('/', function(req,res)
 {
   var userId=req.body.id
   connection.query('SELECT * FROM tweets where id=?', id, function(err,rows,fields)
   {
     if(!err)
     {
       res.send(rows);
     }
     else 
     console.log("error while performing");
   })
 });
 app.listen(3000);

/*
var Twitter = require('twitter');
 
var client = new Twitter({
   consumer_key:         'pQsYK3gYev8XttrCB5yDofoae',
  consumer_secret:      'FJiecXYSrdBH8QzB0mKOWvi8eroDJpxk9q1aHbZJbWleW82beU',
  access_token:         '785066508070203392-rO55JnkXzz8qBxhPVzuV34d2q0omOby',
  access_token_secret:  '7o6mQ55AmrCtQbtbz5Hg7zgt2rqqgSsp82n3sC0AcWBcx'

});
 
var params = {screen_name: 'narender_modi'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);}
    else 
    console.log('error',error)
  
});
*/