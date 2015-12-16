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
        this.refs.title.value = '';
        this.refs.body.value = '';
        this.setState({opened: false});
    },

    render() {
        let self = this;
        return (
            <div className={"add-post-form " + (self.state.opened ? "opened" : "")}>
                <div className="add-post-form-title animated tada" onClick={ self.toggle }>
                    <i className="fa fa-plus"></i> <span className="title-text">Post</span>
                </div>
                <form onSubmit={ self._submitPost }>
                    <input type="text" ref="title" className="input" required placeholder="Titre"/>
                    <textarea ref="body" className="add-post-body-input" required placeholder="Corps"></textarea>
                    <button className="btn plain" type="submit">Poster <i className="fa fa-paper-plane"></i></button>
                </form>
            </div>
        );
    }
});