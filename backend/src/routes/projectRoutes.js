const express = require('express');
const router = express.Router();
const {requireAuth} = require('@clerk/express');
const {createProject,getProjectById,getUserProjects, toogleTask, deleteProject, saveProgress, rescheduleProject} = require('../controllers/projectController');

router.get('/',(req,res)=>{
    res.send("HE")
})
router.post('/create',requireAuth(),createProject)

router.get('/my-projects',requireAuth(),getUserProjects)

router.get('/:id',requireAuth(),getProjectById)

router.patch('/toggle-task',requireAuth(),toogleTask)

router.put('/:id/save-progress',requireAuth(),saveProgress)

router.put('/:id/reschedule',requireAuth(),rescheduleProject)

router.delete('/:id',requireAuth(),deleteProject)
module.exports = router