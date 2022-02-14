module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define(
        'Like', 
        {},
        {
            tableName: 'like'
        }
    );
    Like.associate = models => {
      Like.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }});
      Like.belongsTo(models.Post, {
        foreignKey: {
          allowNull: false
        },
        constraints: false
      });
    };
    return Like;
};