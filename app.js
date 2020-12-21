// jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extened : true}));
app.use(express.static("public"));

let tasks = [];
let workTask = [];
app.get("/", function(req, res) {
  let date = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = date.toLocaleDateString("en-US", options);

  res.render("list", {
    listTitle : day,
    newTask : tasks,
  });
});

app.post("/",function(req,res){
  let task = req.body.newItem;

  if(req.body.list === "work"){
    workTask.push(task);
    res.redirect("/work");
  }else{
    tasks.push(task);
    res.redirect("/");
  }
});

app.get("/work",function(req,res){
  res.render("list",{
    listTitle : "work",
    newTask : workTask,
  });
});

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server has been hosted");
});
