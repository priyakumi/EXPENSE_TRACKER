const User = require('./user');



Post.belongsTo(User, {
    foreignKey: 'user_id',
});

