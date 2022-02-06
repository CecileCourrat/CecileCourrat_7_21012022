const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const sequelize = require('./config/sequelize');



try {
    sequelize.authenticate();
    console.log('Connecté à la base de données MySQL!');
    sequelize.query("CREATE DATABASE `test`;").then(([results, metadata]) => {
      console.log('Base de données créée !');
    })
  } catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');


const app = express();

app.use(helmet());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;