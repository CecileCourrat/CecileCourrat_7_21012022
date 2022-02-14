module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define('Comment', {
      textComment: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
      {
        tableName: 'comment'
      }
    );
    Comment.associate = models => {
      Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }});
      Comment.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        },
        constraints: false
      });
    };
    return Comment;
};