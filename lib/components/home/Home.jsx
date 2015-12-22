HomeComponent = React.createClass({
    render() {
        return (
            <LayoutComponent hideAddPost={true}>
                <h1>home</h1>
                <a href="/walls" className="btn plain">view posts</a>
            </LayoutComponent>
        )
    }
});