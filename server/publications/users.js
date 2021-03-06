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
            imagePath: "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=square",
            imageId: '',
            facebookId: user.services.facebook.id,
            roles: ['user']
        };
    } else {
        user.profile = {
            firstname: options.firstname,
            lastname: options.lastname,
            imagePath: "/img/unknown_user.png",
            imageId: '',
            roles: ['user']
        };
        Meteor.setTimeout(function() {
            Accounts.sendVerificationEmail(user._id);
        }, 2 * 1000);
    }

    return user;
});

Meteor.publish("currentAccessToken", () => {
    return Meteor.users.find(this.userId, {fields: {'services.resume.loginTokens': 1}});
});