Meteor.publish('wallsList', (latitude, longitude, km) => {
    return Walls.find({
        loc: {
            $near: [latitude, longitude],
            $maxDistance: ( (km / 1.60934) / 69) // km to miles, miles to degree
        }
    });
});

Meteor.publish('wallById', (wallId) => {
    return Walls.find(wallId);
});