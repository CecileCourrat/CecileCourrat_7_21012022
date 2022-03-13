const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/', auth, multer, postCtrl.createPost); 
router.delete('/:id', auth, multer, postCtrl.deletePost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, postCtrl.getOnePost);


module.exports = router;
