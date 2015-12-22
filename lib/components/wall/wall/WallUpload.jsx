WallUploadComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            imagesReady: Meteor.subscribe('images').ready(),
            images: Images.find({}).fetch()
        }
    },

    submit(e) {
        FS.Utility.eachFile(e, function(file) {
            console.log('OLKM');
            Images.insert(file, function (err, fileObj) {
                if (err){
                    // handle error
                    console.log('err');
                } else {
                    console.log('OKLM', fileObj);
                }
            });
        });
    },

    render() {
        //console.log(this.data.images[0]);
        return (
            <LayoutComponent>
                <div className="wall-upload-container">
                    UPLOAD
                    <div>
                            <input name="coucou" type="file" onChange={this.submit}/>
                    </div>

                    {
                        this.data.imagesReady ?
                            this.data.images.map( (image, index) => {
                                return Meteor.isClient ?
                                    (<img src={image.url()} key={index} alt=""/>)
                                    : null;
                            }):
                            null
                    }

                </div>
            </LayoutComponent>
        )
    }
});