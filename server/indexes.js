Meteor.startup(function () {
    Walls._ensureIndex({loc: "2d"});
});