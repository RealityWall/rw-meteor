WallUploadComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            imagesReady: Meteor.subscribe('wallImages').ready(),
            images: WallImages.find({}).fetch()
        }
    },
    
    submitImage(e) {
        e.preventDefault();
        let self = this;
        let datepicker = $('#datepicker');
        let date = datepicker.data('datepicker').selectedDates.length > 0 ?
            datepicker.data('datepicker').selectedDates[0]
            : null;

        if (date) {
            WallImages.insert(document.getElementById('wall-img').files[0], function (err, fileObj) {
                if (err) {
                    // handle error
                    console.log('err');
                } else {
                    console.log('OKLM', fileObj._id);
                    Meteor.call('associateImageWithWall', self.props.id, date, fileObj._id);
                }
            });
        } else {
            if (Meteor.isClient) {
                pushErrorToClient({
                    code: 400,
                    id: Session.get('errorId'),
                    message: "must select a date"
                });
            }
        }
    },

    deleteImage(image) {
        console.log(image);
        //WallImages.remove(image._id);
    },

    componentDidMount() {
        let datepickerElement = $('#datepicker');
        datepickerElement.datepicker({
            language: 'fr',
            maxDate: new Date(),
            inline: true
        });
        datepickerElement.data('datepicker').selectDate(new Date());
    },

    render() {
        let self = this;
        return (
            <LayoutComponent>
                <div className="wall-upload-container">
                    <div>
                        <form onSubmit={ self.submitImage } encType="multipart/form-data">
                            <div>
                                à quelle date correspond la photo du mur ?
                            </div>
                            <div id="datepicker" />
                            <div>
                                <input id="wall-img" type="file" accept="image/*"/>
                            </div>
                            <div>
                                <button type="submit" className="btn plain"><i className="fa fa-upload"></i> Envoyer</button>
                            </div>
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