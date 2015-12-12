// Schema for the comment system
let CommentSchema = new SimpleSchema({
    body: {
        type:String
    },
    userId: {
        type: String
    },
    author: {
        type: String
    },
    postId: {
        type: String
    },
    createdAt: {
        type: Date
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

Comments = new Meteor.Collection("comments");
Comments.attachSchema(CommentSchema);

// add before hook
Comments.before.insert( (userId, doc) => {
    doc.userId = userId;
    doc.upvoters = [];
    doc.downvoters = [];
    doc.upvotes = 0;
    doc.downvotes = 0;
});