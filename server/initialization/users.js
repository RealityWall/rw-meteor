Meteor.startup( () => {
    if (Meteor.users.find({}).count() < 1) {
        let userId = Meteor.users.insert({
            profile: {
                firstname: 'admin',
                lastname: 'admin',
                imagePath: '/img/unknown_user.png',
                imageId: '',
                roles : ['admin']
            },
            emails: [{
                address: 'admin@reality-wall.fr',
                verified: true
            }],
            createdAt: new Date()
        });
        Accounts.setPassword(userId, 'password');
        ProfileImages.remove({});
    }
});

Accounts.validateLoginAttempt(function(attemptInfo) {

    if (attemptInfo.type == 'facebook') return true;
    if (attemptInfo.type == 'resume') return true;
    if (attemptInfo.methodName == 'createUser') return false;
    if (attemptInfo.methodName == 'login' && attemptInfo.allowed) {
        var verified = false;
        var email = attemptInfo.methodArguments[0].user.email;
        attemptInfo.user.emails.forEach(function(value, index) {
            if (email == value.address && value.verified) verified = true;
        });
        if (!verified) throw new Meteor.Error(403, 'Verify Email first!');
    }

    return true;
});