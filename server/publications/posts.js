Meteor.publish('postsByWallId', (userId, wallId) => {
    if (isAdminById(userId)) {
        return Posts.find({wallId: wallId, hidden: false});
    } else {
        return Posts.find({wallId: 'haters_gonna_hate'});
    }
});