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
                            <input type="text" placeholder="Rechercher un post, un mur, une ville ..."/>
                            <div><i className="fa fa-search fa-1x"></i></div>
                        </div>

                        <div className="user-icon">
                            <img src="/img/unknown_user.png" alt="Mon Compte" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});