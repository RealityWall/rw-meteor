// Helpers for right Method
isUserById = (userId) => {
    return Meteor.users.findOne({
        _id: userId,
        roles: 'user'
    });
};

isAdminById = (userId) => {
    return Meteor.users.findOne({
        _id: userId,
        roles: 'admin'
    });
};