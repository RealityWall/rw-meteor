Picker.route('/walls/:wallId/posts/:date/pdf/:userId', function(params, req, res, next) {
    let fs = Npm.require('fs');
    let Future = Npm.require('fibers/future');
    let fileName = "generated_coucou.pdf";
    let fut = new Future();

    if (isAdminById(params.userId)) {
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

            let images = ProfileImages.find({
                _id: {$in: posts.map( (post) => {
                    if (!post.author.imagePath) return post.author.imageId;
                })}
            }).fetch();

            posts.forEach( (post) => {
                for (let i = 0; i < images.length; i++) {
                    if (post.author.imageId == images[i]._id) {
                        post.author.imagePath = process.env.URL + images[i].url();
                        break;
                    }
                }
            });

            // This is where SSR reads the pdf and send a information which
            // you can use in it
            let template = 'userPdf';
            SSR.compileTemplate(template, Assets.getText('pdfs/userPdf.html'));
            let html = SSR.render(template, {posts: posts});

            let options = {
                renderDelay: 10,
                phantomConfig: {
                    'ignore-ssl-errors': 'true'
                },
                siteType: 'html',
                'paperSize': {
                    'format': 'A3',
                    'orientation': 'landscape',
                    'margin': '1cm'
                }
            };

            webshot(html, fileName, options, (err) => {
                fs.readFile(fileName, (err, data) => {
                    if (err) return console.log(err);
                    fs.unlinkSync(fileName);
                    fut.return(data);
                });
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



}, {where: 'server'});