SinglePostComponent = React.createClass({

    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            limit: 10
        }
    },

    _increaseLimit(e) {
        e.preventDefault();
        this.setState({limit: this.state.limit + 10});
    },

    getMeteorData() {
        return {
            singlePostReady: Meteor.subscribe("singlePost", this.props.id).ready(),
            commentsListReady: Meteor.subscribe("commentsList", this.props.id, this.state.limit).ready(),
            post: Posts.findOne(this.props.id),
            comments: Comments.find({postId: this.props.id}).fetch()
        }
    },

    _submitComment(e) {
        e.preventDefault();
        Meteor.call('insertComment', this.props.id, this.refs.comment.value);
    },

    render() {
        var self = this;
        return (
            <LayoutComponent>
                <div className="single-post-page">

                    {
                        self.data.singlePostReady ?
                            <Post post={self.data.post} />
                            : null
                    }

                    <div className="add-comment-form">
                        <form onSubmit={ self._submitComment }>
                            <span>Ajouter un commentaire : </span>
                            <textarea type="text" ref="comment" required></textarea>
                            <input type="submit" value="SUBMIT"/>
                        </form>
                    </div>

                    <div className="hbar"></div>

                    <CommentsOfPost comments={self.data.comments} />


                    {
                        self.data.post && self.data.comments.length == self.data.post.commentCount
                            ?
                                null
                            :
                                <a className="btn plain" onClick={ self._increaseLimit }>
                                    Load More
                                </a>
                    }


                </div>
            </LayoutComponent>
        )
    }
});