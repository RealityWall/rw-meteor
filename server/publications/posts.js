Meteor.publish('singlePost', (postId) => {
    return Posts.find(postId);
});

Meteor.publish('postsByWallId', (wallId, limit) => {
    return Posts.find({wallId: wallId}, {limit: limit ? limit : 10});
})

// Comments specific helper
incrPostWall = (wallId, postId) => {
    return Walls.update({_id: wallId}, {
        $push: {posts: postId},
        $inc: {postCount: 1}
    });
};

//////////////////////////////////////////
///////////  EXPORTED METHODS  ///////////
//////////////////////////////////////////
Meteor.methods({
    insertPost(wallId, title, body) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            let postId = Posts.insert({
                title: title,
                body: body,
                userId: userId,
                wallId: wallId
            });
            incrPostWall(wallId, postId);
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