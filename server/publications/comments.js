Meteor.publish('commentsList', (postId, limit) => {
    return Comments.find({postId: postId}, {limit: limit ? limit : 10});
});

// Comments specific helper
incrCommentPost = (postId, userId) => {
    return Posts.update({_id: postId}, {
        $push: {commenters: userId},
        $inc: {commentCount: 1}
    });
};

incrUserCommentCount = (userId) => {
    return Meteor.users.update({_id: userId}, {
        $inc: {commentCount: 1}
    })
};

//////////////////////////////////////////
///////////  EXPORTED METHODS  ///////////
//////////////////////////////////////////
Meteor.methods({
    insertComment(postId, body) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            incrCommentPost(postId, userId);
            incrUserCommentCount(userId);
            let user = Meteor.users.findOne(userId);
            Comments.insert({
                body: body,
                userId: userId,
                postId: postId,
                author: user.firstname + ' ' + user.lastname,
                createdAt: new Date()
            });
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    },
    upVoteComment(postId) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            cancelDownvote(Comments, postId, userId);
            userCancelDownvote('Comments', postId, userId);
            if (upvote(Comments, postId, userId) > 0) {
                userUpvote('Comments', postId, userId);
            }
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    },
    downVoteComment(postId) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            cancelUpvote(Comments, postId, userId);
            userCancelUpvote('Comments', postId, userId);
            if (downvote(Comments, postId, userId) > 0) {
                userDownvote('Comments', postId, userId);
            }
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    }
});