SigninComponent = React.createClass({

    getInitialState() {
        return {
            loading: false,
            error: false
        }
    },

    _submit(e) {
        var self = this;
        e.preventDefault();
        self.setState({loading: true});
        Accounts.createUser({
            email: this.refs.email.value,
            password: this.refs.password.value,
            firstname: this.refs.firstname.value,
            lastname: this.refs.lastname.value
        }, function (err) {
            self.setState({loading:false});
            if (err) self.setState({error: err});
        });
    },

    render() {
        let self = this;
        return (
            <LayoutComponent>
                <div className="login-signin-panel">
                    <div className="login-panel">
                        <form onSubmit={ self._submit }>
                            <h2>Connexion</h2>
                            <input className="input login-mail" type="email" ref="email" required placeholder="email"/>
                            <input className="input login-password"type="password" ref="password" required placeholder="password"/>
                            <div><input className="input login-submit"type="submit" value="Connexion"/></div>
                        </form>
                    </div>
                    <div className="vertical-separator"></div>
                    <div className="signin-panel">
                        <form onSubmit={ self._submit }>
                            <h2>Inscription</h2>
                            <input className="input signin-firstname" type="text" ref="firstname" required placeholder="firstame"/>
                            <input className="input signin-lastname" type="text" ref="lastname" required placeholder="lastname"/>
                            <input className="input signin-mail" type="email" ref="email" required placeholder="email"/>
                            <input className="input signin-password" type="password" ref="password" required placeholder="password"/>
                            <div><input className="input signin-submit" type="submit" value="Envoyer"/></div>
                        </form>
                    </div>
                </div>
                
                
                {
                    self.state.loading
                        ? <div>loading...</div>
                        : null
                }
                {
                    self.state.error
                    ? <div>ERROR</div>
                    : null
                }
            </LayoutComponent>
        )
    }
});