var imageStore = new FS.Store.GridFS("wallImages", {path: "~/walls"});

WallImages = new FS.Collection("wallImages", {
    stores: [imageStore],
    filter: {
        maxSize: 2097152, // in bytes
        allow: {
            contentTypes: ['image/*']
        },
        onInvalid: function () {
            if (Meteor.isClient) {
                pushNotificationToClient({
                    type: 'ERROR',
                    id: Session.get('notificationId'),
                    message: "La taille de l'image doit être inférieure à 2 Mo"
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