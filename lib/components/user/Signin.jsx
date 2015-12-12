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
                <form onSubmit={ self._submit }>
                    <input type="text" ref="firstname" required placeholder="firstame"/>
                    <input type="text" ref="lastname" required placeholder="lastname"/>
                    <input type="email" ref="email" required placeholder="email"/>
                    <input type="password" ref="password" required placeholder="password"/>
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
            </LayoutComponent>
        )
    }
});