UserMenuComponent = React.createClass({

    handleClick: function (e) {
        if (!ReactDOM.findDOMNode(this).contains(e.target)) {
            this.props.hideMenu();
        }
    },

    logOut() {
        Meteor.logout();
        FlowRouter.go('/sign-in');
    },

    componentWillMount: function () {
        document.addEventListener('click', this.handleClick, false);
    },

    componentWillUnmount: function () {
        document.removeEventListener('click', this.handleClick, false);
    },

    render() {
        return (
            <div className="bubble animated fadeIn">
                <div className="menu-item"><i className="fa fa-user"></i><a href={"/users/" + this.props.userId}>Mon Profil</a></div>
                <div className="menu-item"><i className="fa fa-gear"></i><a href="/my-account">Paramètres</a></div>
                <div className="menu-item"><i className="fa fa-unlock"></i><a href="#" onClick={this.logOut}>Se déconnecter</a></div>
            </div>
        );
    }
});