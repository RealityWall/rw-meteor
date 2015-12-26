LogInForm = React.createClass({
    render () {
        return (
            <form>

                <input className="input" type="email" placeholder="Email" required/>
                <input className="input" type="password" placeholder="Mot de passe" required/>

                <button type="submit" className="btn plain animated fadeIn">Se Connecter</button>
            </form>
        );
    }
});