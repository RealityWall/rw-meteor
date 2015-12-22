Meteor.methods({
    insertPost(wallId, body) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            if (isBetween7and22()) {
                if (!hasAlreadyPostedToday()) {
                    let postId = Posts.insert({
                        body: body,
                        userId: userId,
                        wallId: wallId,
                        createdAt: new Date()
                    });

                    Meteor.users.update(userId, {
                       $set :{ lastPost: new Date() }
                    });

                    Walls.update({_id: wallId}, {
                        $push: {posts: postId},
                        $inc: {postCount: 1}
                    });

                    return 'OK';
                } else {
                    if (Meteor.isClient) {
                        pushErrorToClient({
                            code: 403,
                            id: Session.get('errorId'),
                            message: "you have already posted today"
                        });
                    }
                }
            } else {
                if (Meteor.isClient) {
                    pushErrorToClient({
                        code: 403,
                        id: Session.get('errorId'),
                        message: "must be between 7 and 22"
                    });
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