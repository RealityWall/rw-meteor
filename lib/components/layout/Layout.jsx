LayoutComponent = React.createClass({
    render() {
        return (
            <div>
                <Header />
                <div className="body-wrapper">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
});