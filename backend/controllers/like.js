const db = require('../models');

exports.likePost = (req, res) => {
 db.Like.findOne({
    where: { userId: req.body.userId, postId: req.params.id },
  })
    .then((existingLike) => {
      if (existingLike) {
        existingLike.destroy();
        res.status(200).json({ like: false });
      } else {
        db.Like.create({ userId: res.body.userId, postId: req.params.id });
        res.status(201).json({ like: true });
      }
    })
    .catch((error) => res.status(404).json({ error }));
};

   
