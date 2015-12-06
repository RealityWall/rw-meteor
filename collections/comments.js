var CommentSchema = new SimpleSchema({
    body: {
        type:String
    },
    userId: {
        type: String
    },
    postId: {
        type: String
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

Comments.before.insert( (userId, doc) => {
    doc.userId = userId;
    doc.upvoters = [];
    doc.downvoters = [];
    doc.upvotes = 0;
    doc.downvotes = 0;
});

incrCommentPost = (postId, userId) => {
    return Posts.update({_id: postId}, {
        $push: {commenters: userId},
        $inc: {commentCount: 1}
    });
};

Meteor.methods({
    insertComment(postId, body) {
        let userId = this.userId;
        if (userId) {
            // update posts document
            incrCommentPost(postId, userId);
            // insert comment
            Comments.insert({
                body: body,
                userId: userId,
                postId: postId
            });
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    },
    upVoteComment(postId) {

        let userId = this.userId;

        if (userId) {
            cancelDownvote(Comments, postId, userId);
            upvote(Comments, postId, userId);
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    },

    downVoteComment(postId) {

        let userId = this.userId;

        if (userId) {
            cancelUpvote(Comments, postId, userId);
            downvote(Comments, postId, userId);
        } else {
            throw new Meteor.Error(403, "must be logged in");
        }
    }
});