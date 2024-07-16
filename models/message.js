// models/message.js
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    userId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: 'userId', as: 'sender' });
    Message.belongsTo(models.User, { foreignKey: 'recipientId', as: 'recipient' });
  };
  return Message;
};
