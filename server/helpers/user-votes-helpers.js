// Helpers for vote methods
userUpvote = (collection /* as String */, postId, userId) => {
    let modifier = {$addToSet: {}};
    modifier.$addToSet["votes.upvoted" + collection] = postId;
    return Meteor.users.update(userId, modifier);
};

userDownvote = (collection, postId, userId) => {
    let modifier = {$addToSet: {}};
    modifier.$addToSet["votes.downvoted" + collection] = postId;
    return Meteor.users.update(userId, modifier);
};

userCancelUpvote = (collection, postId, userId) => {
    let modifier = {$pull: {}};
    modifier.$pull["votes.upvoted" + collection] = postId;
    return Meteor.users.update(userId, modifier);
};

userCancelDownvote = (collection, postId, userId) => {
    let modifier = {$pull: {}};
    modifier.$pull["votes.downvoted" + collection] = postId;
    return Meteor.users.update(userId, modifier);
};

// Helpers for right Method
isUserById = (userId) => {
    return Meteor.users.findOne({
        _id: userId,
        roles: 'user'
    });
};

isAdminById = (userId) => {
    return Meteor.users.findOne({
        _id: userId,
        roles: 'admin'
    });
};