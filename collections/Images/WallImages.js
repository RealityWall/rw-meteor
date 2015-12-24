var imageStore = new FS.Store.GridFS("images", {path: "~/bonjour"});

WallImages = new FS.Collection("images", {
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
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
    download: function(){
        return true;
    }
});