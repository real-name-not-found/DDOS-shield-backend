const express = require('express');
const router = express.Router();
const { analyzeIP, getHistory } = require('../controllers/ipController');

router.get('/history', getHistory);
router.get('/:ip', analyzeIP);

module.exports = router;