HomeComponent = React.createClass({

    componentDidMount() {
        if (Accounts._verifyEmailToken) {
            Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
                if (err != null) {
                    pushErrorToClient({
                        code: 403,
                        id: Session.get('errorId'),
                        message: "Ce lien n'est plus valide"
                    });
                } else {
                    pushErrorToClient({
                        code: 403,
                        id: Session.get('errorId'),
                        message: "Votre email a bien été validé"
                    });
                    FlowRouter.go('/walls');
                }
            });
        }
    },

    render() {
        return (
            <LayoutComponent hideAddPost={true}>
                <h1>home</h1>
                <a href="/walls" className="btn plain">view posts</a>
            </LayoutComponent>
        )
    }
});