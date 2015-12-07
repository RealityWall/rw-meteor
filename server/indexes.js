Meteor.startup(function () {
    Posts._ensureIndex({ "userId": 1});
    Comments._ensureIndex({ "userId": 1});
    Comments._ensureIndex({ "postId": 1});
});