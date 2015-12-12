// Schema for the post system
let PostSchema = new SimpleSchema({
    title: {
        type: String,
        max: 200
    },
    body: {
        type:String
    },
    wallId: {
        type: String
    },
    userId: {
        type: String
    },
    author: {
        type: String
    },
    createdAt: {
        type: Date
    },
    commentCount: {
        type: Number,
        optional: true
    },
    commenters: {
        type: [String],
        optional: true
    },
    upvotes: {
        type: Number,
        optional: true
    },
    upvoters: {
        type: [String], // XXX
        optional: true
    },
    downvotes: {
        type: Number,
        optional: true
    },
    downvoters: {
        type: [String], // XXX
        optional: true
    }
});

Posts = new Meteor.Collection("posts");
Posts.attachSchema(PostSchema);

// add before hook
Posts.before.insert( (userId, doc) => {
    doc.userId = userId;
    doc.upvoters = [];
    doc.downvoters = [];
    doc.upvotes = 0;
    doc.downvotes = 0;
    doc.commentCount = 0;
    doc.commenters = [];
});

// add after hook
Posts.after.insert( (userId) => {
    Meteor.users.update({_id: userId}, {
        $inc: {postCount: 1}
    })
});