ForgottenPasswordForm = React.createClass({

    _submit(e) {
        e.preventDefault();
        let email =  this.refs.email.value;
        Accounts.forgotPassword({email: email}, (err) => {
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
    },

    render () {
        return (
            <form onSubmit={this._submit}>
                <input className="input" type="email" placeholder="Email" ref="email" required/>
                <button type="submit" className="btn plain animated fadeIn">Envoyer</button>
            </form>
        );
    }
});