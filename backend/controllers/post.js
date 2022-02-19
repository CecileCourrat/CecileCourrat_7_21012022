const db = require('../models');
const fs = require('fs');

exports.createPost = (req, res, next) => {
    db.Post.create({
        userId: req.body.userId,
        content: req.body.content,
      //  image:  `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
    })
      .then(() => res.status(201).json({ message: 'Publication créée !'}))
      .catch(error => res.status(400).json({ error }));
};


exports.modifyPost = (req, res, next) => {
    // const postObject = req.file ?
    // {
    //   ...JSON.parse(req.body.post),
    //   image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // } : { ...req.body };
    // db.Post.findOne({ where: {id: req.params.id} })
    //   .then(() => {
       // const filename = post.image.split('/images/')[1];
       // fs.unlink(`images/${filename}`, () => {
     db.Post.update({ where : {id: req.params.id} })
      .then(() =>res.status(200).json({ message: 'Publication modifiée !'}))
      .catch(error => res.status(400).json({ error }));
    //   });
 // })
};


exports.deletePost = (req, res, next) => {
        db.Post.destroy({ where: {id: req.params.id} })
        .then(() => {
            res.status(200).json({ message: 'Publication supprimée !'});
        })
     .catch(error => res.status(500).json({ error }));
};


exports.getAllPost = (req, res, next) => {
    db.Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
          { model: db.User }
        ]
    })
      .then((post) => res.status(200).json({ post}))
      .catch((error) => res.status(400).json({ error }));
};
