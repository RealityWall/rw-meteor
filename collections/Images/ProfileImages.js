var profileImageStore = new FS.Store.GridFS("profileImages", {path: "~/profile"});

ProfileImages = new FS.Collection("profileImages", {
    stores: [profileImageStore],
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

ProfileImages.allow({
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