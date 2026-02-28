const projectModel = require('../models/project');
const {generateProjectPlan} = require('../services/aiService')

function getAuthUserId(req) {
    if (typeof req.auth === 'function') {
        return req.auth()?.userId;
    }
    return req.auth?.userId;
}

async function createProject(req,res){
    try{
        const {title, description, tech_stack, deadline} = req.body;
        const userId = getAuthUserId(req) || "test_user_123";
        
        if(!userId){
            return res.status(401).json({error:"Unauthorized"});
        }
        
        
        const projectPlan = await generateProjectPlan(req.body);
        
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
        const userId = getAuthUserId(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
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
        const userId = getAuthUserId(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if(project.userId !== userId){
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