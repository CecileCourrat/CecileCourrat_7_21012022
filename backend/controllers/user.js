const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');
const db = require('../models');
const fs = require('fs');

//Schéma pour le mot de passe
const schema = new passwordValidator();
schema
  .is().min(6)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)


exports.signup = (req, res, next) => {
  if (!schema.validate(req.body.password)){
    return res.status(401).json({message: 'Le mot de passe doit contenir au moins 6 caractères, un chiffre, une minuscule et une majuscule'});
};
  bcrypt.hash(req.body.password, 10)
          .then(hash => {
            db.User.create ({
              prenom: req.body.prenom, 
              nom: req.body.nom, 
              email: req.body.email,
              password: hash,
          })
            .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
            .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));     
};

exports.login = (req, res, next) => {
  db.User.findOne({ where : {email: req.body.email} })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé' });
        } 
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect' });
            }
            res.status(200).json({
              userId: user.id,
              token: jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' })
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


exports.getOneUser = (req, res, next) => {
  db.User.findOne({ where: {id: req.params.id} })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
};


exports.modifyUser = (req, res, next) => {
  if (req.file) {
    const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    db.User.update({ image: image }, { where: { id: req.params.id } });
  }
  db.User.update(
    { nom: req.body.nom, prenom: req.body.prenom },
    { where: { id: req.params.id } }
  )
    .then(() => res.status(200).json({ message: 'Profil modifié'}))
    .catch((err) => res.status(400).json({ err }));
};
  

exports.deleteUser = async (req, res, next) => {
  db.User.findOne ({ where: { id: req.params.id } })
    .then((user) => {
         db.Post.destroy( { where: { id: req.params.id } })
         db.Comment.destroy( { where: { id: req.params.id } })
         db.User.destroy( { where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Compte désactivé' }))
        .catch(error => res.status(400).json({ error }));
      })
    .catch (error => res.status(500).json({ error }));
};

  



