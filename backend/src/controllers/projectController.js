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

async function toogleTask(req,res){
    try{
        const {projectId, dayNumber, taskTitle} = req.body;
        const userId = req.auth.userId;

        const project = await projectModel.findOne({_id:projectId, userId});
        if(!project){
            return res.status(404).json({error:"Project not found"});
        }
        const day = project.roadmap.find(d => d.dayNumber === dayNumber);
        const task = day.tasks.find(t => t.title === taskTitle);
        if(task){
            task.completed = !task.completed;

            const allTasks = project.roadmap.flatMap(d => d.tasks);
            const completedTasks = allTasks.filter(t => t.completed).length;
            project.progress = Math.round((completedTasks / allTasks.length) * 100);

            await project.save();
            res.json(project);
        }
        else{
            res.status(404).json({error:"Task not found"});
        }
    } catch(error){
        res.status(500).json({error:"Server error"});
    }
}

async function deleteProject(req,res){
    try {
        const { id } = req.params;
        const userId = req.auth.userId;

        const deleted = await projectModel.findOneAndDelete({ _id: id, userId });
        if (!deleted) return res.status(404).json({ error: "Project not found" });

        res.json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error during deletion" });
    }

}





module.exports = {
    createProject,getProjectById,getUserProjects, deleteProject, toogleTask
    

}