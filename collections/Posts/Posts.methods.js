//////////////////////////////////////////
///////////  EXPORTED METHODS  ///////////
//////////////////////////////////////////
Meteor.methods({
    insertPost(wallId, title, body) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            let user = Meteor.users.findOne(userId);
            let postId = Posts.insert({
                title: title,
                body: body,
                userId: userId,
                wallId: wallId,
                author: user.firstname + ' ' + user.lastname.substr(0, 1) + '.',
                createdAt: new Date()
            });

            // incr postCount on the wall
            Walls.update({_id: wallId}, {
                $push: {posts: postId},
                $inc: {postCount: 1}
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
    upVotePost(postId) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            if (hasAlreadyUpvoted('Posts', postId, userId)) {
                cancelUpvote(Posts, postId, userId);
                userCancelUpvote('Posts', postId, userId);
            } else {
                cancelDownvote(Posts, postId, userId);
                userCancelDownvote('Posts', postId, userId);
                if (upvote(Posts, postId, userId) > 0) {
                    userUpvote('Posts', postId, userId);
                }
            }
        }
        else {
            if (Meteor.isClient) {
                pushErrorToClient({
                    code: 403,
                    id: Session.get('errorId'),
                    message: "must be logged in or user by id"
                });
            }
        }
    },
    downVotePost(postId) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            if (hasAlreadyDownvoted('Posts', postId, userId)) {
                cancelDownvote(Posts, postId, userId);
                userCancelDownvote('Posts', postId, userId);
            } else {
                cancelUpvote(Posts, postId, userId);
                userCancelUpvote('Posts', postId, userId);
                if (downvote(Posts, postId, userId)) {
                    userDownvote('Posts', postId, userId);
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

    hasAlreadyUpvoted(postId) {
        return this.userId ? hasAlreadyUpvoted('Posts', postId, this.userId) : false;
    },

    hasAlreadyDownvoted(postId) {
        return this.userId ? hasAlreadyDownvoted('Posts', postId, this.userId) : false;
    }
});