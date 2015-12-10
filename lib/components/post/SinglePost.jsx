SinglePostComponent = React.createClass({

    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            limit: 10
        }
    },

    _increaseLimit() {
        this.setState({limit: this.state.limit + 10});
    },

    getMeteorData() {
        return {
            singlePostReady: Meteor.subscribe("singlePost", this.props.id).ready(),
            commentsListReady: Meteor.subscribe("commentsList", this.props.id).ready(),
            post: Posts.findOne(this.props.id),
            comments: Comments.find({postId: this.props.id}).fetch()
        }
    },

    _submitComment(e) {
        e.preventDefault();
        Meteor.call('insertComment', this.props.id, this.refs.comment.value);
    },

    _upVoteComment(commentId) {
        Meteor.call('upVoteComment', commentId);
    },

    _downVoteComment(commentId) {
        Meteor.call('downVoteComment', commentId);
    },

    _goBack() {
        window.history.back();
    },

    render() {
        var self = this;
        return (
            <LayoutComponent>
                <div className="singlePostPage">
                    <div className="postDescription">
                        <div>

                            <div className="postVotes">
                                <div className="postUpVote"><i className="fa fa-arrow-up"></i> {self.data.post.upvotes}</div>
                                <div className="postDownVote"><i className="fa fa-arrow-down"></i> {self.data.post.downvotes}</div>
                            </div>
                            <div className="postTitle">{self.data.post.title}</div>
                            <div className="postBody">{self.data.post.body}</div>
                            <div>comments : { self.data.post.commentCount }</div>
                        </div>
                    </div>
                    <div className="addCommentForm">
                        <form onSubmit={ self._submitComment }>
                            <span>Ajouter un commentaire : </span>
                            <textarea type="text" ref="comment" required></textarea>
                            <input type="submit" value="SUBMIT"/>
                        </form>
                    </div>
                    <div className="hbar"></div>
                    <div className="comments">
                        {
                            self.data.comments.map( (comment, index) => {
                                return (
                                    <div key={index} className="comment">
                                        <div> comment:  {comment.body} </div>
                                        <div> upvotes:  {comment.upvotes} </div>
                                        <div> downvotes:  {comment.downvotes} </div>
                                        <div>
                                            <i className="fa fa-clock-o"></i> <TimeAgo time={ comment.createdAt }/>
                                        </div>
                                        <div className="commentUpVote" onClick={ () => { self._upVoteComment(comment._id) } }>upVote</div>
                                        <div className="commentDownVote" onClick={ () => { self._downVoteComment(comment._id) } }>downVote</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <a onClick={ self._goBack } href="#">back</a>
                </div>
            </LayoutComponent>
        )
    }
});