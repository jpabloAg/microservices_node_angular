const router = require('express').Router();

const creditController = require('../controllers/creditController');

router.get('/', creditController.list);
router.post('/add', creditController.save);
router.get('/find/:id', creditController.find);

module.exports = router;