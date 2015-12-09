LayoutComponent = React.createClass({
    render() {
        return (
            <div className="body">
                <Header />
                <div className="body-wrapper">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
});