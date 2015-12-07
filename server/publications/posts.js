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
    upVotePost(postId) {
        let userId = this.userId;
        if (userId) {
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
        if (userId) {
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