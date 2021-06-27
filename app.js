const dotenv = require('dotenv');
dotenv.config({ path: ' ./config.env' });
//const dbURL= process.env.DB_URL.replace('PASSWORD', process.env.DB_PASSWORD);
const dbURL= "mongodb+srv://aklem:clusterLock@cluster0.gtwmf.mongodb.net/Portfolio?retryWrites=true&w=majority"
//l
const express = require('express');
const http = require('http');
const app = express()
const path = require('path');
const mongoose = require('mongoose');
const port = 5000;
//const port = process.env.PORT;
const Project = require('./models/project.js');

///Middle ware being imported from another project, need to reorder
/*const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});

const methodOverride = require('method-override');

const projectRoutes= require('./routes/projects');
const generalRoutes= require('./routes/general');
const adminRoutes= require('./routes/os');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/projects',projectRoutes);

console.log(projects);
*/



//=> {hello: 'world'}


app.set('view engine', 'ejs');

//Database connection/testing
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongo Connected");
})
    .catch(err => {
        console.log("Mongo Error");
    })
//--------------------------------------

//app routing
//app.use()
//--------------------------------------

//app.get('project:id',(req,res)=>{
//  res.render('splash');
//})

//----
//Capture All 404 errors

app.use('/portfolio', express.static(path.join(__dirname, '/public')));

console.log("-------------------------------------------------");
console.log(__dirname);
//https://portfolio.aaronklem.com
app.get('/', async (req, res) => {
    console.log(req.url);
    console.log(req.path);
    const projects = await Project.find({});
    //console.log(projects);
    //res.send("hello");
    res.render(`splash`, {projects});
})

app.get('/portfolio', async (req, res) => {
    console.log(req.url);
    console.log(req.path);
    const projects = await Project.find({});
    //console.log(projects);
    //res.send("hello");
    res.render(`splash`, {projects});
})

app.get('/project/:id', async (req, res) => {
    console.log(req.url);
    console.log(req.path);
    console.log("======");
    console.log(req.params._id);
    
    const projects = await Project.find({"_id":req.params.id});
    console.log(projects);
    //res.send("hello");
    res.render(`detail`, {projects});
})


app.listen(port, () => {
    console.log(`Up and running on port ${port}`);
})