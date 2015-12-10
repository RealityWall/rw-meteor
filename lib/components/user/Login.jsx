LoginComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            userId: Meteor.userId()
        }
    },

    _submit(e) {
        e.preventDefault();
        console.log(this.refs.email.value, this.refs.password.value);
        if (Meteor.isClient) {
            Meteor.loginWithPassword(this.refs.email.value, this.refs.password.value, (err) => {
                if (err) throw err;
                console.log('success log in');
            });
        }
    },

    render() {
        let self = this;
        return (
            <div>
                {
                    self.data.userId
                    ?
                        <div>
                            You are already logged in <br/>
                            click <button onClick={ () => { Meteor.logout(); }}>here</button> to log out
                        </div>
                    :
                        <div>
                            <form onSubmit={ self._submit }>
                                <input type="email" ref="email" required/>
                                <input type="password" ref="password" required/>
                                <input type="submit" value="login"/>
                            </form>
                            <a href="../signin">No Account yet ? Click here to sign in</a>
                        </div>
                }
                <a href="../">home</a>
            </div>
        )
    }
});