Meteor.methods({

   associateImageWithWall(wallId, date, imageId) {
       let userId = this.userId;

       let imageDate = date;
       imageDate.setHours(1);
       imageDate.setMinutes(0);
       imageDate.setSeconds(0);
       imageDate.setMilliseconds(0);

       if (isAdminById(userId)) {
            let wall = Walls.findOne(wallId);
           if (wall) {
               // Delete previous image
               let hasAlreadyUploaded = false;
               for (let i in wall.pictures) {
                   if (new Date(wall.pictures[i].date).getTime() == imageDate.getTime()) {
                       hasAlreadyUploaded = true;
                       WallImages.remove(wall.pictures[i].id);
                       break;
                   }
               }

               if (hasAlreadyUploaded) {
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
               if (Meteor.isServer) {
                   WallImages.remove(imageId);
               }
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