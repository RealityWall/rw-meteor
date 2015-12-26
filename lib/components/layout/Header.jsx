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
            pushErrorToClient({
                code: 403,
                id: Session.get('errorId'),
                message: "you have already posted today"
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
                                ? <a onClick={() => { this.onWallClick('/walls?next=upload') }} className="btn transparent"><i className="fa fa-upload"></i> Photo</a>
                                : null
                        }

                        <div className="user-icon">
                            {
                                this.data.userId ?
                                    <span>
                                        {
                                            this.data.user.profile && this.data.user.profile.facebookId
                                                ?
                                                <a onClick={this.toggle}>
                                                    <img
                                                        src={"http://graph.facebook.com/" + this.data.user.profile.facebookId + "/picture?type=square"}
                                                        alt="Compte Utilisateur" />
                                                </a>
                                                :
                                                <a onClick={this.toggle}><img src="/img/unknown_user.png" alt="Compte Utilisateur" /></a>
                                        }

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