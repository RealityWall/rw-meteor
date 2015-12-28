let AddressSchema = new SimpleSchema({
    address: {
        type: String
    },
    address2: {
        type: String,
        optional: true
    },
    postalCode: {
        type: String
    },
    city: {
        type: String
    }
});

let GeolocSchema = new SimpleSchema({
    lat: {
        type:Number,
        decimal: true
    },
    lon: {
        type:Number,
        decimal: true
    }
});

let WallImageSchema = new SimpleSchema({
    date: {
        type: Date,
        optional: true
    },
    id: {
        type: String,
        optional: true
    }
});

// Schema for the post system
let WallSchema = new SimpleSchema({
    address: {
        type: AddressSchema
    },
    loc: {
        type: GeolocSchema
    },
    postCount: {
        type: Number,
        optional: true
    },
    posts: {
        type: [String],
        optional: true
    },
    pictures: {
        type: [WallImageSchema],
        optional: true,
        blackbox: true
    },
    createdAt: {
        type: Date
    }
});

Walls = new Meteor.Collection("walls");
Walls.attachSchema(WallSchema);

// add before hook
Walls.before.insert( (userId, doc) => {
    doc.postCount = 0;
    doc.posts = [];
    doc.pictures = [];
});