const express = require('express');
const router = express.Router();

const controllerIndex = require('../controllers/index');
const controllerAdmin = require('../controllers/admin');
const controllerLogin = require('../controllers/login');

router.get('/', controllerIndex.get);
router.get('/admin', controllerAdmin.get);
router.get('/login', controllerLogin.get);

module.exports = router;
