const express = require('express');
const router = express.Router();

const validator = require('../middlewares/validator');
const catController = require('../controllers/cat.controller');

router.post('/api/bind-images', validator.blendImageValidation(), catController.blendImage);

module.exports = router;
