const express = require('express');
const router = express.Router();

// const controllerIndex = require('../controllers/index');
// const controllerAdmin = require('../controllers/admin');

// router.get('/', controllerIndex.showMainPage);
router.post('/*', (req, res) => {
  res.send('POST-запрос');
});

// router.get('/admin', isAdmin, controllerAdmin.showAdminPanel);
// router.post('/admin/skills', isAdmin, controllerAdmin.saveSkills);
// router.post('/admin/upload', isAdmin, controllerAdmin.saveProduct);

module.exports = router;
