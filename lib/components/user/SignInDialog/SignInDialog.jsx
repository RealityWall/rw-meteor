SignInDialog = React.createClass({

    getInitialState() {
        return {
            modalSelectedIndex: 0
        }
    },

    toggle() {
        this.refs.dialog.toggle();
    },

    selectTab(index) {
        this.setState({modalSelectedIndex: index});
    },

    render() {
        return (
            <Dialog ref="dialog">
                <div>
                    <div className="header">
                        <div onClick={ () => {this.selectTab(0)} } className={this.state.modalSelectedIndex == 0 ? "selected" : ""}>
                            <div>
                                <i className="fa fa-lock"></i>
                            </div>
                            <div>
                                Connexion
                            </div>
                        </div>
                        <div onClick={ () => {this.selectTab(1)} } className={this.state.modalSelectedIndex == 1 ? "selected" : ""}>
                            <div>
                                <i className="fa fa-sign-in"></i>
                            </div>
                            <div>
                                Inscription
                            </div>
                        </div>
                        <div onClick={ () => {this.selectTab(2)} } className={this.state.modalSelectedIndex == 2 ? "selected" : ""}>
                            <div>
                                <i className="fa fa-key"></i>
                            </div>
                            <div>
                                Mot de passe oublié
                            </div>
                        </div>
                    </div>
                    <div className={"content left-" + this.state.modalSelectedIndex }>
                        <div>
                            {
                                this.state.modalSelectedIndex == 0 ?
                                    <LogInForm />
                                    : null
                            }

                        </div>
                        <div>
                            {
                                this.state.modalSelectedIndex == 1 ?
                                    <SignInForm />
                                    : null
                            }
                        </div>
                        <div>
                            {
                                this.state.modalSelectedIndex == 2 ?
                                    <ForgottenPasswordForm />
                                    : null
                            }
                        </div>
                    </div>
                    <div className="form-footer"></div>
                </div>
            </Dialog>
        );
    }
});