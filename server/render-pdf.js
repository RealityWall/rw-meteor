Picker.route('/walls/:wallId/posts/:date/pdf/:userId', function(params, req, res, next) {
    let fs = Npm.require('fs');
    let Future = Npm.require('fibers/future');
    let fileName = "/tmp/generated_coucou.pdf";
    let fut = new Future();

    let urlArray = req.url.split("?token=");
    if (urlArray.length > 1) {
        let admin = Meteor.users.findOne({
            _id: params.userId,
            'services.resume.loginTokens.0.hashedToken': urlArray[1]
        });

        if (admin) {
            try {
                let dateEntities = params.date.split('-');
                let dateA = new Date(dateEntities[2], dateEntities[1]-1, dateEntities[0], 0, 0, 0, 0);
                let dateB = new Date(dateEntities[2], dateEntities[1]-1, dateEntities[0], 0, 0, 0, 0);
                dateB.setDate(dateB.getDate() + 1);

                let posts = Posts.find({
                    wallId: params.wallId,
                    createdAt: {
                        $gte: dateA,
                        $lt: dateB
                    },
                    hidden: false
                }).fetch();

                posts.forEach((post) => {
                    if (post.author.imagePath == "/img/unknown_user.png") post.author.imagePath = process.env.ROOT_URL + post.author.imagePath;
                });

                let images = ProfileImages.find({
                    _id: {$in: posts.map( (post) => {
                        if (!post.author.imagePath) return post.author.imageId;
                    })}
                }).fetch();

                posts.forEach( (post) => {
                    for (let i = 0; i < images.length; i++) {
                        if (post.author.imageId == images[i]._id) {
                            post.author.imagePath = process.env.ROOT_URL + images[i].url();
                            break;
                        }
                    }
                });

                // This is where SSR reads the pdf and send a information which
                // you can use in it`
                let html = Spacebars.toHTML({posts: posts}, Assets.getText('pdfs/userPdf.html'));
                let filename = `userPdf.html`;
                let filePath = '/tmp/' + filename;

                // write html to file
                let writeFileSync = Meteor.wrapAsync( fs.writeFile );
                try {
                    writeFileSync( filePath, html );
                } catch ( error ) {
                    console.log( 'Error writing html to file:');
                    console.log( error );
                }

                // call phantom to render pdf from html
                let childProcess = Npm.require('child_process');
                let cmd = 'phantomjs --config=assets/app/config.json assets/app/phantomDriver.js ' + filePath;
                let execSync = Meteor.wrapAsync( childProcess.exec );
                try {
                    execSync( cmd );
                } catch ( error ) {
                    console.log( 'Error phantomjs:');
                    console.log( error );
                }

                fs.readFile(filePath.replace('.html', '.pdf'), (err, data) => {
                    if (err) return console.log(err);
                    // delete files
                    fs.unlink( filePath );
                    fs.unlink( filePath.replace('.html', '.pdf') );
                    fut.return(data);
                });


                res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename=userPdf.pdf'
                });
                res.end(fut.wait());
            } catch (e) {
                res.writeHead(403);
                res.end('Unauthorized');
            }
        } else {
            res.writeHead(403);
            res.end('Unauthorized');
        }
    } else {
        res.writeHead(403);
        res.end('Unauthorized');
    }
}, {where: 'server'});