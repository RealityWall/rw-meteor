ProfilePictureSettings = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            readyForProfilePicture: Meteor.subscribe('multipleProfileImage', [this.props.user.profile.imageId]).ready(),
            profilePicture: ProfileImages.findOne({})
        }
    },

    getInitialState() {
        return {
            loading: false
        };
    },

    _inputChange(event) {
        let self = this;
        self.setState({loading: true});
        if (!self.state.loading) {
            FS.Utility.eachFile(event, function(file) {
                ProfileImages.insert(file, function (err, fileObj) {
                    self.setState({loading: false});
                    if (err){
                    } else {
                        self.setState({loading: true});
                        Meteor.call('associateImageWithUser', fileObj._id, () => {
                            self.setState({loading: false});
                        });
                    }
                });
            });
        } else {
            pushNotificationToClient({
                type: 'INFO',
                id: Session.get('notificationId'),
                message: "Veuillez patientez pendant le téléchargement de votre image"
            });
        }
    },

    render() {
        let imagePath = this.props.user.profile.imagePath ?
            this.props.user.profile.imagePath
            : (this.data.profilePicture && Meteor.isClient ? this.data.profilePicture.url() : '');
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 picture-container">
                <div>
                    <div className="title">Votre photo de profil</div>
                    <div className="image" style={{background: 'url("' + imagePath + '")'}}>
                        <input type="file" accept="image/*" onChange={ this._inputChange }/>
                        <div>
                            <i className="fa fa-upload fa-3x"></i>
                        </div>
                    </div>
                    <div className="info">{
                        this.state.loading ?
                            'Chargement...'
                            : 'Cliquez sur votre photo de profil pour en télécharger une nouvelle'
                    }</div>

                </div>
            </div>
        );
    }

});