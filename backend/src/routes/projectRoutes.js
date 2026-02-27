const express = require('express');
const router = express.Router();
const {requireAuth} = require('@clerk/express');
const {createProject,getProjectById,getUserProjects} = require('../controllers/projectController');

router.post('/create',requireAuth(),createProject)

router.get('/my-projects',requireAuth(),getUserProjects)

router.get('/:id',requireAuth(),getProjectById)

module.exports = router