const express = require('express');

const router = express.Router();

const siteController = require('../controllers/siteController');

router.get('', (req, res) => {
  siteController.getSites(req, res);
});

router.post('', (req, res) => {
  siteController.createSite(req, res);
});

module.exports = router;
