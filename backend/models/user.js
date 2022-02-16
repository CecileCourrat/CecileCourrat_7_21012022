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
      allowNull: false,
    },
  },
   { tableName: 'User'
   }
  );
  User.associate = models => {
    User.hasMany(models.Post,{
          onDelete: 'cascade'
      });
    User.hasMany(models.Comment,{
          onDelete: 'cascade'
      });
    User.hasMany(models.Like,{
        onDelete: 'cascade'
    });
    };
    return User;
};
 
  
  