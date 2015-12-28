WallUploadComponent = React.createClass({

    getInitialState() {
        return {
            loading: false
        };
    },
    
    submitImage(e) {
        e.preventDefault();
        let self = this;
        let datepicker = $('#datepicker');
        let date = datepicker.data('datepicker').selectedDates.length > 0 ?
            datepicker.data('datepicker').selectedDates[0]
            : null;

        if (date) {
            if (!self.state.loading) {
                self.setState({loading: true});
                WallImages.insert(document.getElementById('wall-img').files[0], function (err, fileObj) {
                    self.setState({loading: false});
                    if (err) {
                        // handle error
                        console.log('err');
                    } else {
                        Meteor.call('associateImageWithWall', self.props.id, date, fileObj._id, (err) => {
                            if (!err) {
                                pushNotificationToClient({
                                    type: 'SUCCESS',
                                    id: Session.get('notificationId'),
                                    message: "Image mise en ligne avec succès"
                                });
                            }
                        });
                    }
                });
            }
        } else {
            if (Meteor.isClient) {
                pushNotificationToClient({
                    type: 'ERROR',
                    id: Session.get('notificationId'),
                    message: "Vous devez sélectionner une date"
                });
            }
        }
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
                                <button type="submit" className="btn plain"><i className="fa fa-upload"></i> {
                                    self.state.loading ?
                                        'Chargement...'
                                        : 'Envoyer'
                                }</button>
                            </div>
                        </form>
                            
                    </div>
                </div>
            </LayoutComponent>
        )
    }
});