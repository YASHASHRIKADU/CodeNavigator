const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

router.get('/:career', resourceController.getResourcesByCareer);

module.exports = router;
