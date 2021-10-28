const express = require('express');
const router = express.Router();

const admin = require('../controllers/admin');

// Get Customer List
// router.get('/list', admin.getList);

// Create company
router.post('/create-company', admin.createCompany);

module.exports = router;
