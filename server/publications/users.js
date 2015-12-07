// add hook to bind custom properties to user document
Accounts.onCreateUser( (options, user) => {
    var userProperties = {
        postCount: 0,
        commentCount: 0,
        votes: {
            upvotedPosts: [],
            downvotedPosts: [],
            upvotedComments: [],
            downvotedComments: []
        }
    };
    user = _.extend(user, userProperties);
    return user;
});