module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('Post', {
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    },
    {
        tableName: 'post'
    }
    );
    Post.associate = models => {
      Post.belongsTo(models.User, {
        foreignKey : 'userId',
            allowNull: false,
      });
      Post.hasMany(models.Comment, {
        onDelete: 'cascade',
      });
    };
    return Post;
};