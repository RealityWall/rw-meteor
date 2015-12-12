Meteor.publish('commentsList', (postId, limit) => {
    return Comments.find({postId: postId}, {limit: limit ? limit : 10});
});