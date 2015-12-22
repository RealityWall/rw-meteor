Meteor.publish('userData', function() {
    if(!this.userId) return null;
    return Meteor.users.find(this.userId, {fields: {
        roles: 1,
        firstname: 1,
        lastname: 1
    }});
});

// add hook to bind custom properties to user document
Accounts.onCreateUser( (options, user) => {

    var userProperties = {
        profile: {
            firstname: options.firstname,
            lastname: options.lastname
        },
        postCount: 0,
        roles: ['user']
    };

    user = _.extend(user, userProperties);
    return user;
});

Meteor.publish('getUserById', (userId) => {
    return Meteor.users.find(userId);
});