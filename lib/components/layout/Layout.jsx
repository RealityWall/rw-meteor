LayoutComponent = React.createClass({
    render() {
        return (
            <div className="body">
                <Errors />
                <Header hideAddPost={this.props.hideAddPost} />
                <div className="body-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
});