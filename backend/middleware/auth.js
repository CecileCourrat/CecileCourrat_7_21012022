const jwt = require('jsonwebtoken');
const db = require('../models');

const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN);
      const userId = decodedToken.userId;
      db.User.findOne({ id: userId  })
      .then(user => {
        if(!user) {
         throw 'User ID non valable';
      } else {
        next();
      }
    })
    } catch {
      res.status(401).json({ error: new Error('Requête non authentifiée!')});
   }
};