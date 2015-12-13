PostItemComponent = React.createClass({

    _upVote() { Meteor.call('upVotePost', this.props.post._id); },
    _downVote() { Meteor.call('downVotePost', this.props.post._id); },

    render() {
        var self = this;

        let hasAlreadyUpvoted = this.props.post.upvoters.indexOf(Meteor.userId()) >= 0;
        let hasAlreadyDownvoted = this.props.post.downvoters.indexOf(Meteor.userId()) >= 0;

        return (
            <div className="post-item">
                <div className="post-votes">
                    <div className={"post-up-votes " + (hasAlreadyUpvoted ? "toggled" : "")} onClick={ self._upVote }><i className="fa fa-arrow-up"></i></div>
                    <div className={"post-down-votes " + (hasAlreadyDownvoted ? "toggled" : "")} onClick={ self._downVote }><i className="fa fa-arrow-down"></i></div>
                </div>
                <div className="post-description">
                    <div className="post-title"><a href={ '/posts/' + self.props.post._id }>{self.props.post.title}</a></div>
                    {/*<div className="post-body">{self.props.post.body}</div>*/}
                    <div className="post-date"><i className="fa fa-clock-o"></i> <TimeAgo time={ self.props.post.createdAt }/></div>
                    <div className="post-comments-number"><a href={ '/posts/' + self.props.post._id }><i className="fa fa-comment-o"></i> {self.props.post.commentCount} comments</a></div>
                    <div className="post-from"><a href={'/users/' + self.props.post.userId }><i className="fa fa-user"></i> { self.props.post.author }</a></div>
                </div>
            </div>
        );
    }
});