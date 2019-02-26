const express = require('express');
const router = express.Router();

const controllerIndex = require('../controllers/index');
const controllerAdmin = require('../controllers/admin');
const controllerLogin = require('../controllers/login');

router.get('/', controllerIndex.get);
router.post('/', controllerIndex.post);

router.get('/admin', controllerAdmin.get);
router.post('/admin/skills', controllerAdmin.skills);
router.post('/admin/upload', controllerAdmin.upload);

router.get('/login.html', controllerLogin.get);
router.get('/login', controllerLogin.get);
router.post('/login', controllerLogin.post);

module.exports = router;
