ResetPasswordForm = React.createClass({

    getInitialState() {
        return {
            loading: false
        };
    },

    _submit(e) {
        e.preventDefault();
        let self = this;
        if (!self.state.loading) {
            if (self.refs.password.value === self.refs.passwordConfirmation.value) {
                self.setState({loading: true});
                Accounts.resetPassword(self.props.token, self.refs.password.value, (err) => {
                    self.setState({loading: false});
                    if (err) {
                        pushNotificationToClient({
                            type: 'ERROR',
                            id: Session.get('notificationId'),
                            message: "Erreur lors de la mise à jour du mot de passe"
                        });
                    } else {
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
                    message: "Les mots de passe doivent être identiques"
                });
            }
        }
    },

    render() {
        return (
            <LayoutComponent>
                <div className="reset-password-container">
                    <form onSubmit={this._submit}>
                        <div>Entrez votre nouveau mot de passe</div>
                        <input className="input" type="password" ref="password" placeholder="Mot de passe" required/>
                        <input className="input" type="password" ref="passwordConfirmation" placeholder="Mot de passe (confirmation)" required/>
                        <button type="submit" className="btn plain">{
                            this.state.loading ?
                                'Chargement...'
                                : 'Valider'
                        }</button>
                    </form>
                </div>
            </LayoutComponent>
        );
    }
});