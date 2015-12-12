//////////////////////////////////////////
///////////  EXPORTED METHODS  ///////////
//////////////////////////////////////////
Meteor.methods({
    insertComment(postId, body) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {

            // incr commentCount on post
            Posts.update({_id: postId}, {
                $push: {commenters: userId},
                $inc: {commentCount: 1}
            });

            // incr commentCount on user
            Meteor.users.update({_id: userId}, {
                $inc: {commentCount: 1}
            });

            let user = Meteor.users.findOne(userId);
            Comments.insert({
                body: body,
                userId: userId,
                postId: postId,
                author: user.firstname + ' ' + user.lastname.substr(0, 1) + '.',
                createdAt: new Date()
            });
        } else {
            if (Meteor.isClient) {
                pushErrorToClient({
                    code: 403,
                    id: Session.get('errorId'),
                    message: "must be logged in or user by id"
                });
            }
        }
    },
    upVoteComment(postId) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            if (hasAlreadyUpvoted('Comments', postId, userId)) {
                cancelUpvote(Comments, postId, userId);
                userCancelUpvote('Comments', postId, userId);
            } else {
                cancelDownvote(Comments, postId, userId);
                userCancelDownvote('Comments', postId, userId);
                if (upvote(Comments, postId, userId) > 0) {
                    userUpvote('Comments', postId, userId);
                }
            }
        } else {
            if (Meteor.isClient) {
                pushErrorToClient({
                    code: 403,
                    id: Session.get('errorId'),
                    message: "must be logged in or user by id"
                });
            }
        }
    },
    downVoteComment(postId) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            if (hasAlreadyDownvoted('Comments', postId, userId)) {
                cancelDownvote(Comments, postId, userId);
                userCancelDownvote('Comments', postId, userId);
            } else {
                cancelUpvote(Comments, postId, userId);
                userCancelUpvote('Comments', postId, userId);
                if (downvote(Comments, postId, userId) > 0) {
                    userDownvote('Comments', postId, userId);
                }
            }
        } else {
            if (Meteor.isClient) {
                pushErrorToClient({
                    code: 403,
                    id: Session.get('errorId'),
                    message: "must be logged in or user by id"
                });
            }
        }
    }
});