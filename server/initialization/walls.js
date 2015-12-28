Meteor.startup( () => {
    if (Walls.find({}).count() < 1) {
        WallImages.remove({});
        let currentDate = new Date();
        let creationDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
        let walls = [
            {address: {address: 'address', postalCode: '06000', city: 'Nice'}, loc: {lat: 43.700000, lon: 7.250000}, createdAt: creationDate},
            {address: {address: 'address', postalCode: '06560', city: 'Valbonne'}, loc: {lat: 43.6329, lon: 6.9991}, createdAt: creationDate},
            {address: {address: 'address', postalCode: '06600', city: 'Antibes'}, loc: {lat: 43.5833, lon: 7.1167}, createdAt: creationDate}
        ];
        _.each(walls, (wall) => {
            Walls.insert(wall);
        });
    }
});