AddPostFormComponent = React.createClass({

    getInitialState() {
        return {
            opened: false
        }
    },

    toggle() {
        this.setState({opened: !this.state.opened});
    },

    _submitPost(e) {
        e.preventDefault();
        Meteor.call('insertPost', this.props.wallId, this.refs.title.value, this.refs.body.value);
    },

    render() {
        let self = this;
        return (
            <div className={"add-post-form " + (self.state.opened ? "opened" : "")}>
                <div className="add-post-form-title" onClick={ self.toggle }>Ajouter un post</div>
                <form onSubmit={ self._submitPost }>
                    <span className="add-post-title-span">Titre : </span>
                    <input type="text" ref="title" className="add-post-title-input" required/>
                    <span className="add-post-body-span">Corps : </span>
                    <textarea className="add-post-body-input" required></textarea>
                    <input className="add-post-submit" type="submit" value="Poster"/>
                </form>
            </div>
        );
    }
});