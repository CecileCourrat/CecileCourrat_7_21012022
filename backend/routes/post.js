const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/', multer, postCtrl.createPost); 
router.put('/:id',multer, postCtrl.modifyPost); 
router.delete('/:id', postCtrl.deletePost);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);

module.exports = router;
