const express = require('express');
const router = express.Router();

const api = require('../api/index');

// router.post('/*', (req, res) => {
//   res.send('POST-запрос');
//   console.log(req.body);
// });
router.post('/api/saveNewUser', api.saveNewUser);

module.exports = router;
