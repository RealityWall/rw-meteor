UserSettingsComponent = React.createClass({

    logout() {
        Meteor.logout();
        FlowRouter.go('/sign-in');
    },

    render() {
        return (
            <LayoutComponent>
                user profile <br/>
                <button onClick={this.logout}>logout</button>
            </LayoutComponent>
        );
    }
});