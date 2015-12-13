Header = React.createClass({
    render() {
        return (
            <div id="header">
                <div className="inner-bar">
                    <div className="logo">
                        <a href="/"><img src="/img/rw-logo.png" alt="Reality Wall Logo"/></a>
                    </div>
                    <div className="toolbar">
                        <div className="search-bar">
                            <input type="text" placeholder="Recherche..."/>
                            <div><i className="fa fa-search fa-1x"></i></div>
                        </div>

                        <div className="user-icon">
                            <a href="/my-account"><img src="/img/unknown_user.png" alt="Compte Utilisateur" /></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});