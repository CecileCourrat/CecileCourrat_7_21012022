module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    prenom: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    nom: {
      type: Sequelize.STRING(100),
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
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      default: 'http://localhost:3000/images/icon-avatar.png'
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false
    }
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
      };
      return User;
  };
 
  
  