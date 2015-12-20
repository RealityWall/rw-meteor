Post = React.createClass({

    _upVote() { Meteor.call('upVotePost', this.props.post._id); },
    _downVote() { Meteor.call('downVotePost', this.props.post._id); },

    render() {
        let self = this;

        let hasAlreadyUpvoted = this.props.post.upvoters.indexOf(Meteor.userId()) >= 0;
        let hasAlreadyDownvoted = this.props.post.downvoters.indexOf(Meteor.userId()) >= 0;

        return (
            <div className="post-description">
                <div>
                    <div className="rank">
                        <div className="rank-box">
                            <div className="rank">1</div>
                            <div className="score">1549</div>
                        </div>
                    </div>
                    <div className="post-votes">
                        <div className={"post-up-vote " + (hasAlreadyUpvoted ? "toggled" : "")} onClick={ self._upVote }><i className="fa fa-arrow-up"></i> {self.props.post.upvotes}</div>
                        <div className={"post-down-vote " + (hasAlreadyDownvoted ? "toggled" : "")} onClick={ self._downVote }><i className="fa fa-arrow-down"></i> {self.props.post.downvotes}</div>
                    </div>
                    <div className="post-components">
                        <div className="post-title">{self.props.post.title}</div>
                        <div className="post-date"><i className="fa fa-clock-o"></i> 2 hours ago</div>
                        <div className="post-comments-number"><a href="#"><i className="fa fa-comment-o"></i> 2 comments</a></div>
                        <div className="post-from"><a href="#"><i className="fa fa-user"></i> Moi</a></div>
                    </div>
                    <div className="post-body">{self.props.post.body}</div>
                </div>
            </div>
        );
    }
});