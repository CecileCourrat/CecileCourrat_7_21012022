const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const fs = require('fs');
const dbConfig = require('../config/config.json');




exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
          .then(hash => {
            const user = db.User.create ({
              prenom: req.body.prenom, 
              nom: req.body.nom, 
              email: req.body.email,
              password: hash,
          })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));     
};

exports.login = (req, res, next) => {
  db.User.findOne({ where : {email: req.body.email} })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        } 
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
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

