Meteor.publish('postsList', (limit) => {
    return Posts.find({}, {limit: limit ? limit : 1});
});

Meteor.publish('singlePost', (postId) => {
    return Posts.find(postId);
});

//////////////////////////////////////////
///////////  EXPORTED METHODS  ///////////
//////////////////////////////////////////
Meteor.methods({
    insertPost(title, body) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            Posts.insert({
                title: title,
                body: body,
                userId: userId
            });
        } else {
            throw new Meteor.Error(403, "must be logged in or user by id");
        }
    },
    upVotePost(postId) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            cancelDownvote(Posts, postId, userId);
            userCancelDownvote('Posts', postId, userId);
            if (upvote(Posts, postId, userId) > 0) {
                userUpvote('Posts', postId, userId);
            }
        }
        else {
            throw new Meteor.Error(403, "must be logged in");
        }
    },
    downVotePost(postId) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            cancelUpvote(Posts, postId, userId);
            userCancelUpvote('Posts', postId, userId);
            if (downvote(Posts, postId, userId)) {
                userDownvote('Posts', postId, userId);
            }
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    }
});