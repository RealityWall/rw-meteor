PasswordSettings = React.createClass({

    getInitialState() {
        return {
            loading: false
        };
    },

    _updatePassword(e) {
        e.preventDefault();
        let self = this;
        if (!self.state.loading) {
            if (self.refs.newPassword.value == self.refs.newPasswordConfirmation.value) {
                self.setState({loading: true});
                Accounts.changePassword(self.refs.oldPassword.value, self.refs.newPassword.value, (err) => {
                    self.setState({loading: false});
                    if (err) {
                        pushNotificationToClient({
                            type: 'ERROR',
                            id: Session.get('notificationId'),
                            message: "Mot de passe actuel incorrect"
                        });
                    } else {
                        self.refs.oldPassword.value = '';
                        self.refs.newPassword.value = '';
                        self.refs.newPasswordConfirmation.value = '';
                        pushNotificationToClient({
                            type: 'SUCCESS',
                            id: Session.get('notificationId'),
                            message: "Mot de passe modifié avec succès"
                        });
                    }
                });
            } else {
                pushNotificationToClient({
                    type: 'ERROR',
                    id: Session.get('notificationId'),
                    message: "Les nouveaux mots de passe ne correspondent pas"
                });
            }
        }
    },

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 password-container">
                <form onSubmit={ this._updatePassword }>
                    <div className="title">Votre mot de passe</div>
                    <input className="input" type="password" ref="oldPassword" placeholder="Mot de passe actuel" required/>
                    <input className="input" type="password" ref="newPassword" placeholder="Nouveau mot de passe" required/>
                    <input className="input" type="password" ref="newPasswordConfirmation" placeholder="Nouveau mot de passe (confirmation)" required/>
                    <button type="submit" className="btn plain">{
                        this.state.loading ?
                            'Chargement...'
                            : 'Valider'
                    }</button>
                </form>
            </div>
        );
    }
});