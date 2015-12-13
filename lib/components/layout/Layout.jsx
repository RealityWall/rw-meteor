LayoutComponent = React.createClass({
    render() {
        return (
            <div className="body">
                <Errors />
                <Header />
                <div className="body-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
});