CommentsOfPost = React.createClass({

    _upVoteComment(commentId) {
        Meteor.call('upVoteComment', commentId);
    },

    _downVoteComment(commentId) {
        Meteor.call('downVoteComment', commentId);
    },

    render() {
        let self = this;
        return (
            <div className="comments">
                {
                    self.props.comments.map( (comment, index) => {
                        return (
                            <div key={index} className="comment">
                                <div className="comment-separator"></div>
                                <div className="left-comment-side">
                                    <a href="/my-account">
                                        <img src="/img/unknown_user.png" alt="Compte Utilisateur" />
                                        <div className="comment-username">username</div>
                                        <div><TimeAgo time={ comment.createdAt }/></div>
                                    </a>
                                </div>
                                <div className="right-comment-side">
                                    <div className="comment-votes">
                                        <div className="comment-up-vote" onClick={ () => { self._upVoteComment(comment._id) } }>{comment.upvotes}</div>
                                        <div className="comment-down-vote" onClick={ () => { self._downVoteComment(comment._id) } }>{comment.downvotes}</div>
                                    </div>
                                    <div className="comment-description">
                                        <div>{comment.body} </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
});