WallPostFormComponent = React.createClass({

    _postMessage(e) {
        e.preventDefault();
        let self = this;
        Meteor.call('insertPost', this.props.id, this.refs.body.value, function(error, result) {
            if (error) {}

            if (result === 'OK') {
                pushNotificationToClient({
                    type:'SUCCESS',
                    id: Session.get('notificationId'),
                    message: "Votre message a été posté avec succès"
                })
            }
        });
    },

    render() {
        return (
            <LayoutComponent>
                <div className="wall-post-container">
                    <h1>Poster un message</h1>
                    <p>Attention ! vous ne pouvez postez qu&#39;un seul message par jour !</p>
                    <form onSubmit={ this._postMessage }>
                        <textarea ref="body" className="add-post-body-input" required placeholder="Entrez votre message..."></textarea>
                        <button className="btn plain" type="submit">Poster <i className="fa fa-paper-plane"></i></button>
                    </form>
                </div>
            </LayoutComponent>
        )
    }
});