Meteor.publish('commentsList', (postId, limit) => {
    return Comments.find({postId: postId}, {limit: limit ? limit : 10});
});

Meteor.publish('commentsByUserId', (userId, limit) => {
    return Comments.find({userId: userId}, {limit: limit ? limit : 10});
});