Meteor.publish('userData', function() {
    if(!this.userId) return null;
    return Meteor.users.find(this.userId, {fields: {
        roles: 1,
        profile: 1,
        lastPost: 1
    }});
});

// add hook to bind custom properties to user document
Accounts.onCreateUser( (options, user) => {

    user.postCount =  0;

    if (typeof(user.services.facebook) != "undefined") {
        user.profile = {
            firstname: user.services.facebook.first_name,
            lastname: user.services.facebook.last_name,
            facebookId: user.services.facebook.id,
            roles: ['user']
        };
    } else {
        user.profile = {
            firstname: options.firstname,
            lastname: options.lastname,
            roles: ['user']
        };
    }

    return user;
});

Meteor.publish('getUserById', (userId) => {
    return Meteor.users.find(userId);
});