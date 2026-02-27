const projectModel = require('../models/project');
const {generateProjectPlan} = require('../services/aiService')
async function createProject(req,res){
    try{
        const {title, description, tech_stack, deadline} = req.body;
        const userId = req.auth().userId;
        
        
        
        const projectPlan =  generateProjectPlan(req.body);
        
        const project = new projectModel({
            userId,
            title,
            description,
            tech_stack,
            deadline,
            roadmap: projectPlan,
            status:'in progress',
            progress: 0
        
        })

        const saved = await project.save();
        res.status(201).json(saved);

    } catch(error){
        console.log("error in project creation",error);
        res.status(500).json({error:"Failed to create project"});
    }
    
}
async function getUserProjects(req,res) {
    try{
        const userId = req.auth().userId;
        const projects  = await projectModel.find({userId}).sort({createdAt: -1});
        res.status(200).json(projects);
    } catch(error){
        res.status(500).json({msg:"erroor fetching projects"})
    }
}

async function getProjectById(req,res){
    try{
        const {id} = req.params;
        const project = await projectModel.findById(id);
        if(!project){
            return res.status(404).json({error:"Project not found"});
        }
        if(project.userId !== req.auth().userId){
            return res.status(403).json({error:"Unauthorized"});
        }
        res.status(200).json(project);
    } catch(error){
        res.status(500).json({msg:"server error"})
    }

}

module.exports = {
    createProject,getProjectById,getUserProjects
    

}