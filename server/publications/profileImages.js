Meteor.publish("multipleProfileImage", function(userIds) {
    return ProfileImages.find({
        _id: {$in: userIds}
    });
});