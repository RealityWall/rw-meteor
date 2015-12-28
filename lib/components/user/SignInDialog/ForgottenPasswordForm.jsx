ForgottenPasswordForm = React.createClass({

    getInitialState() {
        return {
            loading: false
        };
    },

    _submit(e) {
        e.preventDefault();
        let self = this;
        let email = self.refs.email.value;
        if (!self.state.loading) {
            self.setState({loading: true});
            Accounts.forgotPassword({email: email}, (err) => {
                self.setState({loading: false});
                if (err) {
                    pushNotificationToClient({
                        type: 'ERROR',
                        id: Session.get('notificationId'),
                        message: "Ce mail n'est pas valide"
                    });
                } else {
                    pushNotificationToClient({
                        type: 'SUCCESS',
                        id: Session.get('notificationId'),
                        message: "Email envoyé à : " + email
                    });
                }
            });
        }
    },

    render () {
        return (
            <form onSubmit={this._submit}>
                <input className="input" type="email" placeholder="Email" ref="email" required/>
                <button type="submit" className="btn plain animated fadeIn">{
                    this.state.loading ?
                        'Chargement...'
                        : 'Envoyer'
                }</button>
            </form>
        );
    }
});