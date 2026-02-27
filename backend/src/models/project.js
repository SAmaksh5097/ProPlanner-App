const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    timeEstimate:{
        type:String
    },
    completed:{
        type: Boolean,
        default: false
    }
});

const daySchema = new mongoose.Schema({
    dayNumber:{
        type: Number,
        required: true
    },
    date:{
        type: String,
    },
    tasks:[taskSchema]
});


const ProjectSchema = mongoose.Schema({
    userId:{
        type:String,
        required: true,
        index: true
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    tech_stack:{
        type: [String],
        required: true
    },
    deadline:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending',
    },
    progress:{
        type: Number,
        default: 0
    },
    roadmap:[daySchema]

},{
    timestamps: true})

const projectModel = mongoose.model('project',ProjectSchema);

module.exports = projectModel;