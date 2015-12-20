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

                        let hasAlreadyUpvoted = comment.upvoters.indexOf(Meteor.userId()) >= 0;
                        let hasAlreadyDownvoted = comment.downvoters.indexOf(Meteor.userId()) >= 0;

                        return (
                            <div key={index} className="comment">
                                <div className="comment-separator"></div>
                                <div className="left-comment-side">
                                    <a href={"/users/" + comment.userId}>
                                        <img src="/img/unknown_user.png" alt="Compte Utilisateur" />
                                    </a>
                                </div>
                                <div className="right-comment-side">
                                    <div className="comment-votes">
                                        <div className={"comment-up-vote " + (hasAlreadyUpvoted ? "toggled":"")} onClick={ () => { self._upVoteComment(comment._id) } }>{comment.upvotes}</div>
                                        <div className={"comment-down-vote " + (hasAlreadyDownvoted ? "toggled":"")} onClick={ () => { self._downVoteComment(comment._id) } }>{comment.downvotes}</div>
                                    </div>
                                    <div className="comment-description">
                                        <div className="comment-username"><a href={"/users/" + comment.userId}>{comment.author}</a></div>
                                        <div className="comment-date"><TimeAgo time={ comment.createdAt }/></div>
                                        <div className="comment-body">{comment.body} </div>
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