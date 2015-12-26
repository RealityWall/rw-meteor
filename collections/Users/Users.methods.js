Meteor.methods({

    associateImageWithUser(imageId) {
        let userId = Meteor.userId();
        if (userId) {
            Meteor.users.update(userId, {
                $set: {
                    'profile.imageId': imageId,
                    'profile.imagePath': ''
                }
            })
        } else {
            if (Meteor.isServer) {
                ProfileImages.remove(imageId);
            }
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