let AuthorSchema = new SimpleSchema({
    name: {
        type:String
    },
    imagePath: {
        type: String,
        optional: true
    },
    imageId: {
        type: String,
        optional: true
    }
});

// Schema for the post system
let PostSchema = new SimpleSchema({
    body: {
        type:String
    },
    wallId: {
        type: String
    },
    userId: {
        type: String
    },
    createdAt: {
        type: Date
    },
    author: {
        type: AuthorSchema
    },
    hidden: {
        type: Boolean
    }
});

Posts = new Meteor.Collection("posts");
Posts.attachSchema(PostSchema);

// add before hook
Posts.before.insert( (userId, doc) => {
    doc.userId = userId;
});

// add after hook
Posts.after.insert( (userId) => {
    Meteor.users.update({_id: userId}, {
        $inc: {postCount: 1}
    })
});