const db = require('../models');

exports.createComment = (req, res, next) => {
    db.Comment.create({
        userId: req.body.userId,
        postId: req.body.postId,
        textComment: req.body.textComment,
    })
      .then(() => res.status(201).json({ message: 'Commentaire créé'}))
      .catch(error => res.status(400).json({ error })); 
};


exports.modifyComment = (req, res, next) => {
    db.Comment.findOne({ where: { id: req.params.id } })
    .then(() => {
      db.Comment.update({ ...req.body }, { where: { id: req.params.id } })
      .then(() => res.status(200).json({ message: 'Commentaire modifié' }))
      .catch(error => res.status(400).json({ error }))
  })
  .catch(error => res.status(500).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({ where: { id: req.params.id }})
      .then(() => {
        db.Comment.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Commentaire supprimé'}))
        .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


exports.getAllComment = (req, res, next) => {
    db.Comment.findAll({  
        order: [
            ['createdAt', 'DESC'],
        ],
        include: [{model: db.User}]
   })
    .then((comments) => {
        res.status(200).json(comments);
    })
    .catch((error) => {
        res.status(404).json({ error });
    });
};

exports.getAllCommentsOfOnePost = (req, res, next) => {
    db.Comment.findAll({
        where: { PostId: req.params.postId },
        order: [
            ['createdAt', 'ASC'],
        ],
        include: [{model: db.User}]
    })
    .then((comments) => {
        res.status(200).json(comments);
    })
    .catch((error) => {
        res.status(404).json({ error });
    });
};