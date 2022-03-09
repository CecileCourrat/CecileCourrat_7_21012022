const db = require('../models');

exports.likeAPost = async (req, res) => {
  const  PostId  = req.body.postId;
  const UserId = req.body.userId;
  const exist = await db.Like.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!exist) {
    await db.Like.create({ PostId: PostId, UserId: UserId })
      .then(() => {
        res.status(201).json({ message: 'Like ajouté' });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  } else {
    await db.Like.destroy({
      where: { PostId: PostId, UserId: UserId },
    })
      .then(() => {
        res.status(201).json({ message: 'Like supprimé' });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
};


