var PostSchema = new SimpleSchema({
    title: {
        type: String,
        max: 200
    },
    body: {
        type:String
    },
    userId: {
        type: String
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

Posts.before.insert( (userId, doc) => {
    doc.userId = userId;
    doc.upvoters = [];
    doc.downvoters = [];
    doc.upvotes = 0;
    doc.downvotes = 0;
    doc.commentCount = 0;
    doc.commenters = [];
});

Posts.allow({
    insert(userId, doc) {
        return userId == doc.userId;
    }
});


//////////////////////////////////////////
///////////  EXPORTED METHODS  ///////////
//////////////////////////////////////////
Meteor.methods({
    upVotePost(postId) {

        let userId = this.userId;

        if (userId) {
            cancelDownvote(Posts, postId, userId);
            upvote(Posts, postId, userId);
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    },

    downVotePost(postId) {

        let userId = this.userId;

        if (userId) {
            cancelUpvote(Posts, postId, userId);
            downvote(Posts, postId, userId);
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    }
});