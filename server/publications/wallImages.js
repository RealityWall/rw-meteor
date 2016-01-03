Meteor.publish("multipleWallImage", function(imageIds) {
    return WallImages.find({
        _id: {$in: imageIds}
    });
});