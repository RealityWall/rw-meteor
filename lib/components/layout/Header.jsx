Header = React.createClass({
    render() {
        return (
            <div id="header">
                <div className="inner-bar">
                    <div className="logo">logo</div>
                    <div className="toolbar">
                        <div className="search-button">
                            <i className="fa fa-search fa-2x"></i>
                        </div>
                        <div className="user-button">
                            <i className="fa fa-user fa-2x"></i>
                        </div>
                        <div className="add-post-button">
                            <i className="fa fa-edit fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});