const express = require('express');
const router = express.Router();


const ticket = require('../controllers/ticket');

// create ticket
router.post('/create', ticket.create);

// view ticket
router.get('/:id', ticket.view);

// view ticket by project
router.get('/list/:project_id', ticket.listByProject);

// view ticket by user
router.get('/assigned-to/:user_id', ticket.listByUser);

// update ticket title
router.put('/update/:key', ticket.update);

// remove ticket
router.delete('/remove/:id', ticket.remove);

// add comment
router.post('/add/comment', ticket.addComment);

// view comments
router.get('/comments/:ticket_id', ticket.commentList);

// remove comment
router.delete('/remove/comment/:id', ticket.removeComment);

module.exports = router;