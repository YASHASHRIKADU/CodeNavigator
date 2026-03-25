const express = require('express');
const router  = express.Router();
const { getDomains, getCareerPathsByDomain } = require('../controllers/domainController');

// GET /api/v1/domains
router.get('/', getDomains);

// GET /api/v1/domains/:domain/career-paths
// Note: Express captures the segment before any trailing path, so
// "Web Development" must be URL-encoded as "Web%20Development" by the client.
router.get('/:domain/career-paths', getCareerPathsByDomain);

module.exports = router;
