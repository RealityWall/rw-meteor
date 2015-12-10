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
                    <input type="text" ref="title" required/>
                    <input type="text" ref="body" required/>
                    <input type="submit" value="SUBMIT"/>
                </form>
            </div>
        );
    }
});