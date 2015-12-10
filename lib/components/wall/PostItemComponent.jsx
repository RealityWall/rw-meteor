PostItemComponent = React.createClass({

    _upVote() { Meteor.call('upVotePost', this.props.post._id); },
    _downVote() { Meteor.call('downVotePost', this.props.post._id); },

    render() {
        var self = this;
        return (
            <div className="post-item">
                <div className="post-votes">
                    <div className="post-up-votes" onClick={ self._upVote }><i className="fa fa-arrow-up"></i> {self.props.post.upvotes}</div>
                    <div className="post-down-votes" onClick={ self._downVote }><i className="fa fa-arrow-down"></i> {self.props.post.downvotes}</div>
                </div>
                <div className="post-description">
                    <div className="post-title"><a href={ '/posts/' + self.props.post._id }>{self.props.post.title}</a></div>
                    <div className="post-body">{self.props.post.body}</div>
                    <div className="post-date"><i className="fa fa-clock-o"></i> <TimeAgo time={ self.props.post.createdAt }/></div>
                    <div className="post-comments-number"><i className="fa fa-comment-o"></i> {self.props.post.commentCount} comments</div>
                    <div className="post-from"><i className="fa fa-user"></i> { self.props.post.author }</div>
                </div>
            </div>
        );
    }
});