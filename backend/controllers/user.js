const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const dbConfig = require('../config/config.json');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
          .then(hash => {
            db.User.create({
              nom: req.body.nom, 
              prenom: req.body.prenom, 
              email: req.body.email,
              password: hash,
              isAdmin: req.body.isAdmin,
          })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
          })
          .catch(error => res.status(500).json({ error }));     
};

exports.login = (req, res, next) => {
  db.User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.TOKEN,
                { expiresIn: '24h' })
            });
          })
          .catch(error => res.status(500).json({ error }));
        }
      })
      .catch(error => res.status(500).json({ error }));
};
