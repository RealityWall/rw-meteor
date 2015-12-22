WallPostComponent = React.createClass({

    getInitialState() {
        return {
            success: false,
            showStep: true
        }
    },

    _postMessage(e) {
        e.preventDefault();
        let self = this;
        Meteor.call('insertPost', this.props.id, this.refs.body.value, function(error, result) {
            if (error) console.log('coucou');

            if (result === 'OK') {
                self.setState({success: true});
            }
        });
    },

    render() {
        return (
            <LayoutComponent>
                <div className="wall-post-container">
                    <div>
                        attention ! vous ne pouvez postez qu'un seul message par jour !
                    </div>
                    <form onSubmit={ this._postMessage }>
                        <textarea ref="body" className="add-post-body-input" required placeholder="Entrez votre message..."></textarea>
                        <button className="btn plain" type="submit">Poster <i className="fa fa-paper-plane"></i></button>
                    </form>

                    {
                        this.state.success ?
                            'bravo tu as envoyé un post !'
                            : null
                    }

                    {
                        this.state.showStep ?
                            <div className="step-wrapper">
                                <div className="step-1 animated tada">
                                    <span className="step-title">étape 2 :</span> écrivez votre message
                                </div>
                            </div>
                            : null
                    }

                </div>
            </LayoutComponent>
        )
    }
});