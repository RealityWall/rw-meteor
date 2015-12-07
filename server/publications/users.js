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

// Helpers methods
userUpvotePost = (postId, userId) => {
    return Meteor.users.update(userId, {
        $addToSet: {'votes.upvotedPosts': postId}
    });
};

userDownvotePost = (postId, userId) => {
    return Meteor.users.update({_id: userId}, {
        $addToSet: {'votes.downvotedPosts': postId}
    });
};

userCancelUpvotePost = (postId, userId) => {
    return Meteor.users.update({_id: userId}, {
        $pull: {'votes.upvotedPosts': postId}
    });
};

userCancelDownvotePost = (postId, userId) => {
    return Meteor.users.update({_id: userId}, {
        $pull: {'votes.downvotedPosts': postId}
    });
};

userUpvoteComment = (postId, userId) => {
    return Meteor.users.update(userId, {
        $addToSet: {'votes.upvotedComments': postId}
    });
};

userDownvoteComment = (postId, userId) => {
    return Meteor.users.update(userId, {
        $addToSet: {'votes.downvotedComments': postId}
    });
};

userCancelUpvoteComment = (postId, userId) => {
    return Meteor.users.update(userId, {
        $pull: {'votes.upvotedComments': postId}
    });
};

userCancelDownvoteComment = (postId, userId) => {
    return Meteor.users.update(userId, {
        $pull: {'votes.downvotedComments': postId}
    });
};