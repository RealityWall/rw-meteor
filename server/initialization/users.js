Meteor.startup( () => {
    if (Meteor.users.find({}).count() < 1) {
        let userId = Meteor.users.insert({
            profile: {
                firstname: 'admin',
                lastname: 'admin'
            },
            emails: [{
                address: 'admin@admin.fr',
                verified: true
            }],
            roles : ['admin'],
            createdAt: new Date()
        });
        Accounts.setPassword(userId, 'password');
    }
});