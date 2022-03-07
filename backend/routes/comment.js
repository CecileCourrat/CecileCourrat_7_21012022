const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

const auth = require('../middleware/auth');

router.post('/',  commentCtrl.createComment); 
router.put('/:id',  auth, commentCtrl.modifyComment); 
router.delete('/:id', auth, commentCtrl.deleteComment);
router.get('/',  commentCtrl.getAllComment);
router.get('/:postId', commentCtrl.getAllComments);


module.exports = router;