SignInForm = React.createClass({
    render () {
        return (
            <form ng-submit="hc.signIn()">

                <input className="input" type="text" placeholder="Prénom" ng-model="hc.user.firstname" required/>
                <input className="input" type="text" placeholder="Nom" ng-model="hc.user.lastname" required/>
                <input className="input" type="email" placeholder="Email" ng-model="hc.user.mail" required/>
                <input className="input" type="password" placeholder="Mot de passe" ng-model="hc.user.password" required/>

                <button type="submit" className="btn plain animated fadeIn">Créer un compte</button>
            </form>
        );
    }
});