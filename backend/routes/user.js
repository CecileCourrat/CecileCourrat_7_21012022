const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', multer, userCtrl.modifyUser);
router.delete('/:id', auth, userCtrl.deleteUser);


module.exports = router;