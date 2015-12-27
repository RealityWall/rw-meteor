Header = React.createClass({

    mixins: [ReactMeteorData],


    getMeteorData() {
        return {
            userId: Meteor.userId(),
            user: Meteor.user()
        }
    },

    getInitialState() {
        return {
            toggled: false
        }
    },

    toggle() {
        this.setState({toggled: !this.state.toggled});
    },

    onWallClick (location) {

        if (location == '/walls?next=post' && hasAlreadyPostedToday()) {
            pushNotificationToClient({
                type: 'ERROR',
                id: Session.get('notificationId'),
                message: "Vous avez déjà posté un message aujourd'hui"
            });
        } else {
            FlowRouter.go(location);
            window.dispatchEvent(new Event('searchchange'));
        }


    },

    render() {
        return (
            <div id="header">
                <div className="inner-bar">
                    <div className="logo">
                        <a href="#" onClick={() => { this.onWallClick('/walls') }}><img src="/img/rw-logo.png" alt="Reality Wall Logo"/></a>
                    </div>

                    <div className="toolbar">
                        {
                            this.props.hideAddPost || !this.data.user || (this.data.user && this.data.user.profile && this.data.user.profile.roles && this.data.user.profile.roles.indexOf('admin') >= 0) ?
                                null
                                : <a onClick={() => { this.onWallClick('/walls?next=post') }} className="btn transparent"><i className="fa fa-plus"></i> Post</a>
                        }

                        {
                            this.data.user && this.data.user.profile && this.data.user.profile.roles && this.data.user.profile.roles.indexOf('admin') >= 0
                                ? <a onClick={() => { this.onWallClick('/walls?next=posts') }} className="btn transparent"><i className="fa fa-comments"></i> <span className="hidden-xs">Messages</span></a>
                                : null
                        }

                        {
                            this.data.user && this.data.user.profile && this.data.user.profile.roles && this.data.user.profile.roles.indexOf('admin') >= 0
                                ? <a onClick={() => { this.onWallClick('/walls?next=upload') }} className="btn transparent"><i className="fa fa-upload"></i> <span className="hidden-xs">Photo</span></a>
                                : null
                        }

                        <div className="user-icon" style={{paddingTop: (this.data.userId ? '10px':'0px')}}>
                            {
                                this.data.userId ?
                                    <span>

                                        <a onClick={this.toggle}>
                                            {
                                                this.data.user && this.data.user.profile.imageId ?
                                                    <MyCustomImage imageId={this.data.user.profile.imageId}/>
                                                    : <img src={this.data.user.profile.imagePath} />
                                            }
                                        </a>

                                        {
                                            this.state.toggled ?
                                                <UserMenuComponent hideMenu={this.toggle} userId={this.data.userId}/>
                                                : null
                                        }

                                    </span>
                                    : <a onClick={ this.props.toggleSignInDialog } className="btn transparent"><i className="fa fa-lock"></i> Connexion</a>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

MyCustomImage = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            readyForProfilePicture: Meteor.subscribe("myProfileImage", this.props.imageId),
            profilePicture: ProfileImages.findOne(this.props.imageId)
        }
    },

    render() {
        return (
            <div className="profile-thumb" style={{
                backgroundImage: 'url("' +
                 (this.data.readyForProfilePicture && this.data.profilePicture && Meteor.isClient ?
                    this.data.profilePicture.url() : "/img/unknown_user.png")
                 + '")'
            }}>
            </div>
        );
    }

});