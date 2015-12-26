ForgottenPasswordForm = React.createClass({
    render () {
        return (
            <form ng-submit="hc.logIn()">

                <input className="input" type="email" placeholder="Email" ng-model="hc.user.mail" required/>

                <button type="submit" className="btn plain animated fadeIn">Envoyer</button>
            </form>
        );
    }
});