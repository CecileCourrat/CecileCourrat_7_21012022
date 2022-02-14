const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//router.delete('/delete/:id', auth, userCtrl.delete);
//router.put('/modify/:id', auth, multer, userCtrl.modify);
//router.get('/:id', auth, userCtrl.getOne);



module.exports = router;