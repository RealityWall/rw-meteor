WallUploadComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            imagesReady: Meteor.subscribe('images').ready(),
            images: WallImages.find({}).fetch()
        }
    },
    
    submitImage(e) {
        e.preventDefault();
        //console.log(e.target[0]);
        //Meteor.call('uploadImage', document.getElementById('coucou').files[0]);
        WallImages.insert(document.getElementById('coucou').files[0], function (err, fileObj) {
            if (err){
                // handle error
                console.log('err');
            } else {
                console.log('OKLM', fileObj);
            }
        });
    },

    deleteImage(image) {
        console.log(image);
        WallImages.remove(image._id);
    },

    render() {
        //console.log(this.data.images[0]);
        let self = this;
        return (
            <LayoutComponent>
                <div className="wall-upload-container">
                    UPLOAD
                    <div>
                        <form onSubmit={ self.submitImage } encType="multipart/form-data">
                            <input id="coucou" type="file"/>
                            <input type="submit"/>
                        </form>
                            
                    </div>

                    {
                        self.data.imagesReady ?
                            self.data.images.map( (image, index) => {
                                return Meteor.isClient ?
                                    (<img height="100" src={image.url()} key={index} alt=""
                                          onClick={ () => { self.deleteImage(image) }}/>)
                                    : null;
                            }):
                            null
                    }

                </div>
            </LayoutComponent>
        )
    }
});