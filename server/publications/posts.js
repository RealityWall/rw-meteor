Meteor.publish('singlePost', (postId) => {
    return Posts.find(postId);
});

Meteor.publish('postsByWallId', (wallId, limit) => {
    return Posts.find({wallId: wallId}, {limit: limit ? limit : 10, sort: {commentCount: -1}});
});

Meteor.publish('postsByUserId', (userId, limit) => {
    return Posts.find({userId: userId}, {limit: limit ? limit : 10});
});