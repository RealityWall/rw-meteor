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
        Accounts.createUser({email: this.refs.email.value, password: this.refs.password.value}, function (err) {
            self.setState({loading:false});
            if (err) self.setState({error: err});
        });
    },

    render() {
        let self = this;
        return (
            <div>
                <form onSubmit={ self._submit }>
                    <input type="email" ref="email" required/>
                    <input type="password" ref="password" required/>
                    <input type="submit" value="signin"/>
                </form>
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
                <a href="../login">Already an account ? Click here to log in</a>
            </div>
        )
    }
});