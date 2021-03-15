const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const Project = require('./models/project.js');

//sets which database will be uses+ sets up error message if it can't connect

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Mongo Connected");
})
    .catch(err => {
        console.log("Mongo Error");
    })

/////////////////////////Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

////////////////////////Pathing

app.get('/', async (req, res) => {
    //find keynote projects
    const projects = await Project.find({});
    console.log(projects);
    res.render('index.ejs', { projects });
})
app.get('/about', async (req, res) => {
    res.render('about.ejs', {});
})
/////////////////////////
app.get('/projects', async (req, res) => {
    const projects = await Project.find({});
    console.log(projects);
    res.render(`gallery.ejs`, { projects });
})
///////////////////////////
app.get('/projects/:id', async (req, res) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    res.render('projectDetails.ejs', {project});
})
////
////
app.get('/highlights', async (req, res) => {
    const projects = await Project.find({isHighlight:true});
    console.log(projects);
    res.render(`highlight.ejs`, { projects });
})
////////////////////////
app.get('/add', async (req, res) => {
    
    res.render(`overseer.ejs`, {});
})
/////////////
app.post('/projects', async (req, res)=>{
   const newProject = new Project(req.body);
   await newProject.save();
   console.log(newProject);
   res.redirect(`/projects/${newProject.id}`);
});
///////////
app.delete('/projects', async (req, res) => {
    const product = await Project.deleteMany({});
    res.redirect('/projects');
})

app.listen(5000, () => {
    console.log("listening on port 5000");
})