LayoutComponent = React.createClass({
    render() {
        return (
            <div className="body">
                <Header />
                <div className="body-wrapper">
                    {this.props.children}
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
                <Footer />
            </div>
        )
    }
});