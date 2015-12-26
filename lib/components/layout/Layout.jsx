LayoutComponent = React.createClass({

    toggleDialog(e) {
        e.stopPropagation();
        this.refs.signInDialog.toggle();
    },

    render() {
        return (
            <div className="body">
                <Errors />
                <Header hideAddPost={this.props.hideAddPost} toggleSignInDialog={ this.toggleDialog } />
                <div className="body-wrapper">
                    {this.props.children}
                </div>
                <SignInDialog ref="signInDialog" />
            </div>
        )
    }
});