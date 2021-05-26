const router = require('express').Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.list);
router.post('/update/:id', customerController.update);
router.post('/updateRabbit', customerController.updateRabbit);
router.get('/find/:id', customerController.find);

module.exports = router;