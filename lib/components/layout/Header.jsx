Header = React.createClass({

    mixins: [ReactMeteorData],


    getMeteorData() {
        return {
            userId: Meteor.userId()
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

    render() {
        return (
            <div id="header">
                <div className="inner-bar">
                    <div className="logo">
                        <a href="/walls"><img src="/img/rw-logo.png" alt="Reality Wall Logo"/></a>
                    </div>
                    <div className="toolbar">
                        {
                            this.props.hideAddPost ?
                                null
                                : <a href="/walls?next=post" className="btn transparent"><i className="fa fa-plus"></i> Post</a>
                        }

                        <div className="user-icon">
                            {
                                this.data.userId ?
                                    <span>
                                        <a onClick={this.toggle}><img src="/img/unknown_user.png" alt="Compte Utilisateur" /></a>
                                        {
                                            this.state.toggled ?
                                                <UserMenuComponent hideMenu={this.toggle} userId={this.data.userId}/>
                                                : null
                                        }

                                    </span>
                                    : <a href="/sign-in" className="btn transparent"><i className="fa fa-lock"></i> Connexion</a>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
});