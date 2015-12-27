UserSettingsComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            currentUser: Meteor.user()
        }
    },

    render() {
        return (
            <LayoutComponent>
                <div className="settings-container row">
                    {
                        this.data.currentUser ?
                            <NameSettings user={this.data.currentUser}/>
                            : null
                    }
                    {
                        this.data.currentUser ?
                            <ProfilePictureSettings user={this.data.currentUser} />
                            : null
                    }
                    {
                        this.data.currentUser && !this.data.currentUser.profile.facebookId ?
                            <PasswordSettings />
                            : null
                    }
                </div>
            </LayoutComponent>
        );
    }
});