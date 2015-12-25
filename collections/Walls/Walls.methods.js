Meteor.methods({

   associateImageWithWall(wallId, date, imageId) {
       let userId = this.userId;

       let imageDate = date;
       imageDate.setHours(1);
       imageDate.setMinutes(0);
       imageDate.setSeconds(0);
       imageDate.setMilliseconds(0);

       if (isAdminById(userId)) {
            let wall = Walls.findOne({
                _id: wallId,
                pictures: { $elemMatch : { date: imageDate }}
            });
           if (wall) {
               // Delete previous image
               for (let i in wall.pictures) {
                   if (new Date(wall.pictures[i].date).getTime() == imageDate.getTime()) {
                       WallImages.remove(wall.pictures[i].id);
                       break;
                   }
               }
               // update pictures element
               Walls.update({
                   _id: wallId,
                   pictures: { $elemMatch : { date: imageDate }}
               }, {
                   $set: {
                       'pictures.$.id' : imageId
                   }
               });
           } else {
               // push new picture
               Walls.update(wallId, {
                   $push: {
                       pictures: {
                           date: imageDate,
                           id: imageId
                       }
                   }
               });
           }
       } else {
           if (Meteor.isClient) {
               pushErrorToClient({
                   code: 403,
                   id: Session.get('errorId'),
                   message: "must be logged in and admin by id"
               });
           }
       }
   }
});