HomeComponent = React.createClass({
    render() {
        return (
            <LayoutComponent>
                <h1>home</h1>
                <a href="./posts" className="btn plain">view posts</a>
            </LayoutComponent>
        )
    }
});