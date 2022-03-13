const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');

router.post('/', commentCtrl.createComment); 
router.delete('/:id', auth, commentCtrl.deleteComment);
router.get('/', auth, commentCtrl.getAllComment);
router.get('/:postId', auth, commentCtrl.getAllCommentsOfOnePost);


module.exports = router;