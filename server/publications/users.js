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
        firstname: options.firstname,
        lastname: options.lastname,
        postCount: 0,
        commentCount: 0,
        votes: {
            upvotedPosts: [],
            downvotedPosts: [],
            upvotedComments: [],
            downvotedComments: []
        },
        roles: ['user']
    };
    user = _.extend(user, userProperties);
    return user;
});


// TODO : publish userData role to know who is the user on the front end
// TODO : secure URL thanks to user role (admin) to create new displayer acounts

// TODO : create admin account
// TODO : create secure