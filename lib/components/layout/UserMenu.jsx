UserMenuComponent = React.createClass({

    handleClick: function (e) {
        if (!ReactDOM.findDOMNode(this).contains(e.target)) {
            this.props.hideMenu();
        }
    },

    logOut() {
        Meteor.logout(function () {
            FlowRouter.go('/');
        });

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
                <div className="menu-item"><i className="fa fa-user"></i><a href="/my-account">Mon Profil</a></div>
                <div className="menu-item"><i className="fa fa-unlock"></i><a href="#" onClick={this.logOut}>Se déconnecter</a></div>
            </div>
        );
    }
});