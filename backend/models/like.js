module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define('Like', { 
     },
        { tableName: 'like'
        }
    );
    Like.associate = models => {
      Like.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'cascade',
        });
      Like.belongsTo(models.Post, {
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
    };
    return Like;
};