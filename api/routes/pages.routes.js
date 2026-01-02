const express = require('express');
const router = express.Router();
const pagesController = require('../controllers/pages.controller');

router.get('/', pagesController.home);
router.get('/login', pagesController.loginPage);
router.get('/register', pagesController.registerPage);
router.get('/account', pagesController.accountTest)
router.get('/test', (req, res) => {
  res.send('<h3>WebSite is Waked Up !!</h3>');
});

module.exports = router;
