const express = require('express');
const person = require('../controllers/person.controller');

const router = express.Router();

// Get attributes (columns) for used table
router.get('/person', person.getAttributes);


// Get table data for selected attribute
router.post('/person', person.getTableData);

module.exports = router;
