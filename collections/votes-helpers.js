upvote = (collection, itemId, userId) => {
    return collection.update({_id: itemId, upvoters: { $ne: userId }}, {
        $addToSet: {upvoters: userId},
        $inc: {upvotes: 1}
    });
};

downvote = (collection, itemId, userId) => {
    return collection.update({_id: itemId, downvoters: { $ne: userId }}, {
        $addToSet: {downvoters: userId},
        $inc: {downvotes: 1}
    });
};

cancelUpvote = (collection, itemId, userId) => {
    return collection.update({_id: itemId, upvoters: userId}, {
        $pull: {upvoters: userId},
        $inc: {upvotes: -1}
    });
};

cancelDownvote = (collection, itemId, userId) => {
    return collection.update({_id: itemId, downvoters: userId}, {
        $pull: {downvoters: userId},
        $inc: {downvotes: -1}
    });
};