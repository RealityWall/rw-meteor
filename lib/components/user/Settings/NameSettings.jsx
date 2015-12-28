NameSettings = React.createClass({

    getInitialState() {
        return {
            loading: false
        };
    },

    componentDidMount() {
        this.refs.firstName.value = this.props.user.profile.firstname;
        this.refs.lastName.value = this.props.user.profile.lastname;
    },

    _updateName(e) {
        e.preventDefault();
        let self = this;
        if (!self.state.loading) {
            if (self.refs.firstName.value != self.props.user.profile.firstname
                || self.refs.lastName.value != self.props.user.profile.lastname) {
                self.setState({loading: true});
                Meteor.call('updateName', self.refs.firstName.value, self.refs.lastName.value, () => {
                    self.setState({loading: false});
                });
            }
        }
    },

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 name-container">
                <form onSubmit={ this._updateName }>
                    <div className="title">Votre prénom et nom</div>
                    <input className="input" type="text" ref="firstName" placeholder="Prénom" required/>
                    <input className="input" type="text" ref="lastName" placeholder="Nom" required/>
                    <button type="submit" className="btn plain">{
                        this.state.loading ?
                            'Chargement...'
                            : 'Valider'
                    }</button>
                </form>
            </div>
        );
    }

});