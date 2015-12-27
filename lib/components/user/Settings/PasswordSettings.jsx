PasswordSettings = React.createClass({

    _updatePassword(e) {
        e.preventDefault();
        let self = this;
        if (self.refs.newPassword.value == self.refs.newPasswordConfirmation.value) {
            Accounts.changePassword(self.refs.oldPassword.value, self.refs.newPassword.value, (err) => {
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

    },

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <form onSubmit={ this._updatePassword }>
                    <input className="input" type="password" ref="oldPassword" placeholder="Mot de passe actuel" required/>
                    <input className="input" type="password" ref="newPassword" placeholder="Nouveau mot de passe" required/>
                    <input className="input" type="password" ref="newPasswordConfirmation" placeholder="Nouveau mot de passe (confirmation)" required/>
                    <button type="submit" className="btn plain">Valider</button>
                </form>
            </div>
        );
    }
});