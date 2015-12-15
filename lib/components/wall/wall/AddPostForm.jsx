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
                <div className="add-post-form-title animated tada" onClick={ self.toggle }>
                    <i className="fa fa-plus"></i> <span className="title-text">Post</span>
                </div>
                <form onSubmit={ self._submitPost }>
                    <span className="add-post-title-span">Titre : </span>
                    <input type="text" ref="title" className="add-post-title-input" required/>
                    <span className="add-post-body-span">Corps : </span>
                    <textarea ref="body" className="add-post-body-input" required></textarea>
                    <button className="btn plain" type="submit">Poster <i className="fa fa-paper-plane"></i></button>
                </form>
            </div>
        );
    }
});