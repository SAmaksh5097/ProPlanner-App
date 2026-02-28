const express = require('express');
const router = express.Router();
const {requireAuth} = require('@clerk/express');
const {createProject,getProjectById,getUserProjects} = require('../controllers/projectController');

router.get('/',(req,res)=>{
    res.send("HE")
})
// router.post('/create',requireAuth(),createProject)
router.post('/create',createProject)

router.get('/my-projects',requireAuth(),getUserProjects)

router.get('/:id',requireAuth(),getProjectById)

module.exports = router