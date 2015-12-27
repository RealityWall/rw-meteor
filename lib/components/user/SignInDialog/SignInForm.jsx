SignInForm = React.createClass({

    getInitialState() {
        return {
            loading: false,
            error: null
        }
    },

    _submit(e) {
        var self = this;
        e.preventDefault();
        self.setState({loading: true});
        let email = this.refs.email.value;
        Accounts.createUser({
            email: email,
            password: this.refs.password.value,
            firstname: this.refs.firstname.value,
            lastname: this.refs.lastname.value
        }, function (err) {
            self.setState({loading:false});
            if (err) {
                if (err.reason != "Login forbidden") {
                    pushNotificationToClient({
                        type: 'ERROR',
                        id: Session.get('notificationId'),
                        message: "Cet email est déjà pris"
                    });
                } else {
                    pushNotificationToClient({
                        type: 'SUCCESS',
                        id: Session.get('notificationId'),
                        message: "Un email de confirmation a été envoyé à " + email
                    });
                }
            } else {
                pushNotificationToClient({
                    type: 'SUCCESS',
                    id: Session.get('notificationId'),
                    message: "Un email de confirmation a été envoyé à " + email
                });
            }
        });
    },

    _facebookLogin() {
        let self = this;
        Meteor.loginWithFacebook({}, function(err) {
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

                    <input className="input" type="text" placeholder="Prénom" ref="firstname" required/>
                    <input className="input" type="text" placeholder="Nom" ref="lastname" required/>
                    <input className="input" type="email" placeholder="Email" ref="email" required/>
                    <input className="input" type="password" placeholder="Mot de passe" ref="password" required/>

                    <button type="submit" className="btn plain animated fadeIn">Créer un compte</button>
                    <hr/>
                </form>
                <button onClick={ this._facebookLogin } className="btn plain facebook animated fadeIn"><i className="fa fa-facebook"></i> Se Connecter Avec Facebook</button>
            </div>

        );
    }
});