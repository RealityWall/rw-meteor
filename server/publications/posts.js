Meteor.publish('postsList', (limit) => {
    return Posts.find({}, {limit: limit ? limit : 1});
});

Meteor.publish('singlePost', (postId) => {
    return Posts.find(postId);
});