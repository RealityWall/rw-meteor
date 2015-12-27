LogInForm = React.createClass({

    getInitialState() {
        return {
            loading: false
        }
    },


    _submit(e) {
        var self = this;
        e.preventDefault();
        self.setState({loading: true});
        if (Meteor.isClient) {
            Meteor.loginWithPassword(this.refs.email.value, this.refs.password.value, (err) => {
                self.setState({loading: false});
                if (err) {
                    pushNotificationToClient({
                        type: 'ERROR',
                        id: Session.get('notificationId'),
                        message: "Email / Mot de passe incorrect"
                    });
                } else {
                    self.props.toggle();
                    FlowRouter.go('/walls');
                }
            });
        }
    },

    _facebookLogin() {
        let self = this;
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                pushNotificationToClient({
                    type: 'ERROR',
                    id: Session.get('notificationId'),
                    message: "Une erreur est survenue lors de la connexion à Facebook"
                });
            } else {
                self.props.toggle();
                FlowRouter.go('/walls');
            }
        });
    },

    render () {
        return (
            <div>
                <form onSubmit={ this._submit }>
                    <input className="input" type="email" ref="email" placeholder="Email" required/>
                    <input className="input" type="password" ref="password" placeholder="Mot de passe" required/>

                    <button type="submit" className="btn plain animated fadeIn">Se Connecter</button>
                    <hr/>
                </form>

                <button onClick={ this._facebookLogin } className="btn plain animated fadeIn facebook"><i className="fa fa-facebook"></i> Se Connecter Avec Facebook</button>
            </div>

        );
    }
});