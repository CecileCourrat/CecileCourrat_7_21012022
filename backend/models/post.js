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
    },
    {
        tableName: 'post'
    }
    );
    Post.associate = models => {
      Post.belongsTo(models.User, {
        foreignKey : 'userId',
        onDelete: 'cascade',
      });
      Post.hasMany(models.Comment, {
        foreignKey : 'userId',
        onDelete: 'cascade',
      });
    };
    return Post;
};