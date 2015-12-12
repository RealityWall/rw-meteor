Meteor.publish('singlePost', (postId) => {
    return Posts.find(postId);
});

Meteor.publish('postsByWallId', (wallId, limit) => {
    return Posts.find({wallId: wallId}, {limit: limit ? limit : 10});
});