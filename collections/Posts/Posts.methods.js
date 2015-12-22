Meteor.methods({
    insertPost(wallId, body) {
        let userId = this.userId;
        if (userId && isUserById(userId)) {
            let user = Meteor.users.findOne(userId);

            let postId = Posts.insert({
                body: body,
                userId: userId,
                wallId: wallId,
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
    }
});