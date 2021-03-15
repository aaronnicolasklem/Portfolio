const mongoose = require('mongoose');
//const { url } = require('node:inspector');

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true

    },
    thumbnailImg:{
        type:String,
        required:true,
        default:"Thumbnail.jpg"
    },
    projectBlurb:{
        type:String,
        required:true
    },
    projectDescription:{
        type:String,
        required:true
    },
    isHighlight:{ type: Boolean},
    tags:{
        type: Array,
    }
})

const Project = mongoose.model ('Project', projectSchema);
module.exports = Project;