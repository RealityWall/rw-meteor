var imageStore = new FS.Store.GridFS("wallImages", {path: "~/walls"});

WallImages = new FS.Collection("wallImages", {
    stores: [imageStore],
    filter: {
        maxSize: 2097152, // in bytes
        allow: {
            contentTypes: ['image/*']
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                pushErrorToClient({
                    code: 400,
                    id: Session.get('errorId'),
                    message: message
                });
            }
        }
    }
});

WallImages.allow({
    insert: function(userId){
        return isAdminById(userId);
    },
    update: function() {
        return false;
    },
    remove: function(userId) {
        return isAdminById(userId);
    },
    download: function(){
        return true;
    }
});