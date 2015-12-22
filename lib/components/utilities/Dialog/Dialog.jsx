Dialog = React.createClass({

    getInitialState() {
        return {
            visible: false
        }
    },

    toggle() {
        this.setState({visible: !this.state.visible});
    },

    render() {
        return (
            <div className={"dialog animated fadeIn " + (this.state.visible ? "" : "hidden")}>
                <div className="content">
                    { this.props.children }
                </div>
            </div>
        );
    }

});