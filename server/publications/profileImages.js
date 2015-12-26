Meteor.publish("multipleProfileImage", function(userIds) {
    return ProfileImages.find({
        _id: {$in: userIds}
    });
});

Meteor.publish("myProfileImage", function (imageId) {
    return ProfileImages.find(imageId);
});