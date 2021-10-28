const express = require('express');
const router = express.Router();

const project = require('../controllers/project');

// Create project
router.post('/create', project.create);

// Get List
router.get('/list/:company_id', project.list);

// Get List
router.get('/:id', project.view);

// Add user in project
router.post('/add-user', project.addMember);

// Remove user in project
router.delete('/remove-user/:id', project.removeMember);

module.exports = router;