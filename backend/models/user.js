module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    prenom: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: 'http://localhost:3000/images/icon-avatar.png'
    },
  },
   { tableName: 'User'
   }
  );
  User.associate = models => {
    User.hasMany(models.Post,{
         foreignKey : 'userId',
          onDelete: 'cascade'
      });
    User.hasMany(models.Comment,{
         foreignKey : 'userId',
          onDelete: 'cascade'
      });
  };
    return User;
};
 
  
  