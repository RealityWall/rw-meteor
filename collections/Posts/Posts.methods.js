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
                        },
                        hidden: false
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
                        pushNotificationToClient({
                            type: 'ERROR',
                            id: Session.get('notificationId'),
                            message: "Vous avez déjà posté un message aujourd'hui"
                        });
                    }
                }
            } else {
                if (Meteor.isClient) {
                    pushNotificationToClient({
                        type: 'ERROR',
                        id: Session.get('notificationId'),
                        message: "Vous ne pouvez poster qu'entre 7h et 22h"
                    });
                }
            }
        } else {
            if (Meteor.isClient) {
                pushNotificationToClient({
                    type: 'ERROR',
                    id: Session.get('notificationId'),
                    message: "Vous devez être connecté"
                });
            }
        }
    },

    hidePost(postId) {
        let userId = Meteor.userId();
        if (isAdminById(userId)) {
            Posts.update(postId, { $set: { hidden: true } });
            if (Meteor.isClient) {
                pushNotificationToClient({
                    type: 'SUCCESS',
                    id: Session.get('notificationId'),
                    message: "Ce post a bien été supprimé"
                });
            }
        } else {
            if (Meteor.isClient) {
                pushNotificationToClient({
                    type: 'ERROR',
                    id: Session.get('notificationId'),
                    message: "Vous devez être connecté en tant qu'administrateur"
                });
            }
        }
    }
});