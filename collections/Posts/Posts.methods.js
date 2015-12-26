Meteor.methods({
    insertPost(wallId, body) {
        let userId = this.userId;
        let user = isUserById(userId);
        if (userId && user) {
            if (isBetween7and22()) {
                if (!hasAlreadyPostedToday()) {
                    let postId = Posts.insert({
                        body: body,
                        userId: userId,
                        wallId: wallId,
                        createdAt: new Date(),
                        author: {
                            name: user.profile.firstname + " " + user.profile.lastname.substr(0, 1) + ".",
                            imagePath: user.profile.imagePath,
                            imageId: user.profile.imageId
                        }
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
                            message: "Vous avez déjà posté un message aujourd'hui"
                        });
                    }
                }
            } else {
                if (Meteor.isClient) {
                    pushErrorToClient({
                        code: 403,
                        id: Session.get('errorId'),
                        message: "Vous ne pouvez poster qu'entre 7h et 22h"
                    });
                }
            }
        } else {
            if (Meteor.isClient) {
                pushErrorToClient({
                    code: 403,
                    id: Session.get('errorId'),
                    message: "Vous devez être connecté"
                });
            }
        }
    }
});