Meteor.methods({

    associateImageWithUser(imageId) {
        let userId = Meteor.userId();
        if (userId) {
            // get previous profile image
            let user = Meteor.users.findOne(userId);

            // update user profile
            Meteor.users.update(userId, {
                $set: {
                    'profile.imageId': imageId,
                    'profile.imagePath': ''
                }
            });

            // update all posts
            Posts.update({
                userId: userId
            }, {
                $set: {
                    'author.imageId': imageId,
                    'author.imagePath': ''
                }
            });

            // delete previous profile images
            if (user.profile.imageId) ProfileImages.remove(user.profile.imageId);
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
    },

    updateName(firstName, lastName) {
        let userId = Meteor.userId();
        let user = Meteor.users.findOne(userId);
        if (userId && user) {
            if (!user.profile.lastNameModification ||
                (user.profile.lastNameModification
                    && (new Date() - new Date(user.profile.lastNameModification)) > 1000 * 60 * 60 * 24 * 7)) {
                // update user profile
                Meteor.users.update(userId, {
                    $set: {
                        'profile.firstname': firstName,
                        'profile.lastname': lastName,
                        'profile.lastNameModification': new Date()
                    }
                });

                // update all posts
                Posts.update({
                    userId: userId
                }, {
                    $set: {
                        'author.name': firstName + " " + lastName.substr(0, 1) + "."
                    }
                });
                if (Meteor.isClient) {
                    pushErrorToClient({
                        code: 403,
                        id: Session.get('errorId'),
                        message: "Votre prénom et nom ont été modifiés avec succès"
                    });
                }
            } else {
                if (Meteor.isClient) {
                    pushErrorToClient({
                        code: 403,
                        id: Session.get('errorId'),
                        message: "Vous ne pouvez modifiez votre nom que toutes les semaines"
                    });
                }
            }
        } else {
            if (Meteor.isClient && !userId) {
                pushErrorToClient({
                    code: 403,
                    id: Session.get('errorId'),
                    message: "Vous devez être connecté"
                });
            }
        }
    }
});