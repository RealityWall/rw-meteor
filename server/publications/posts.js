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
            userCancelDownvotePost(postId, userId);
            if (upvote(Posts, postId, userId) > 0) {
                userUpvotePost(postId, userId);
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
            userCancelUpvotePost(postId, userId);
            if (downvote(Posts, postId, userId)) {
                userDownvotePost(postId, userId);
            }
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    }
});