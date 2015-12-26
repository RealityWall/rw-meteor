Meteor.publish('postsByWallId', (userId, wallId, limit) => {
    if (isAdminById(userId)) {
        return Posts.find({wallId: wallId}, {limit: limit ? limit : 10, sort: {commentCount: -1}});
    } else {
        return Posts.find({wallId: 'haters_gonna_hate'});
    }

});

Meteor.publish('postsByUserId', (userId, limit) => {
    return Posts.find({userId: userId}, {limit: limit ? limit : 10});
});