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
        return (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <img src={this.props.user.profile.imagePath ?
                    this.props.user.profile.imagePath
                    : (this.data.profilePicture && Meteor.isClient ? this.data.profilePicture.url() : '') }/>
                <input type="file" accept="image/*" onChange={ this._inputChange }/>
            </div>
        );
    }

});