Dialog = React.createClass({

    getInitialState() { return { visible: false } },
    toggle() { this.setState({visible: !this.state.visible}); },

    render() {
        return (
            <div className={"dialog animated fadeIn " + (this.state.visible ? "" : "hidden")}>
                <div className="content" ref="dialogContent">
                    <div className="close" onClick={ this.toggle }><i className="fa fa-times"></i></div>
                    { this.props.children }
                </div>
            </div>
        );
    }

});