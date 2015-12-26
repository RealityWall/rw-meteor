NameSettings = React.createClass({

    componentDidMount() {
        this.refs.firstName.value = this.props.user.profile.firstname;
        this.refs.lastName.value = this.props.user.profile.lastname;
    },

    _updateName(e) {
        e.preventDefault();
        if (this.refs.firstName.value != this.props.user.profile.firstname
            || this.refs.lastName.value != this.props.user.profile.lastname) {
            Meteor.call('updateName', this.refs.firstName.value, this.refs.lastName.value);
        }
    },

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <form onSubmit={ this._updateName }>
                    <input className="input" type="text" ref="firstName" placeholder="Prénom" required/>
                    <input className="input" type="text" ref="lastName" placeholder="Nom" required/>
                    <button type="submit" className="btn plain">Valider</button>
                </form>
            </div>
        );
    }

});