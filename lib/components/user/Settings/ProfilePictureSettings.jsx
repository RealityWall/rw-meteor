ProfilePictureSettings = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            readyForProfilePicture: Meteor.subscribe('multipleProfileImage', [this.props.user.profile.imageId]).ready(),
            profilePicture: ProfileImages.findOne({})
        }
    },

    _inputChange(event) {
        FS.Utility.eachFile(event, function(file) {
            ProfileImages.insert(file, function (err, fileObj) {
                if (err){
                    console.log('err');
                } else {
                    Meteor.call('associateImageWithUser', fileObj._id);
                }
            });
        });
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
                    <div className="info">Cliquez sur votre photo de profil pour en télécharger une nouvelle</div>

                </div>
            </div>
        );
    }

});