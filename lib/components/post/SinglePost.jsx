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

    _upVote() { Meteor.call('upVotePost', this.props.id); },
    _downVote() { Meteor.call('downVotePost', this.props.id); },

    render() {
        var self = this;
        return (
            <LayoutComponent>
                <div className="single-post-page">
                    <div className="post-description">
                        <div>
                            <div className="rank">
                                <div className="rank-box">
                                    <div className="rank">1</div>
                                    <div className="score">1549</div>
                                </div>
                            </div>
                            <div className="post-votes">
                                <div className="post-up-vote" onClick={ self._upVote }><i className="fa fa-arrow-up"></i> {self.data.post.upvotes}</div>
                                <div className="post-down-vote" onClick={ self._downVote }><i className="fa fa-arrow-down"></i> {self.data.post.downvotes}</div>
                            </div>
                            <div className="post-components">
                                <div className="post-title">{self.data.post.title}</div>
                                <div className="post-date"><i className="fa fa-clock-o"></i> 2 hours ago</div>
                                <div className="post-comments-number"><a href="#"><i className="fa fa-comment-o"></i> 2 comments</a></div>
                                <div className="post-from"><a href="#"><i className="fa fa-user"></i> Moi</a></div>
                            </div>
                            <div className="post-body">{self.data.post.body}</div>
                        </div>
                    </div>
                    <div className="add-comment-form">
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
                                        <div className="left-comment-side">
                                            <a href="/my-account"><img src="/img/unknown_user.png" alt="Compte Utilisateur" /></a>
                                        </div>
                                        <div className="right-comment-side">
                                            <div className="comment-votes">
                                                <div className="comment-up-vote" onClick={ () => { self._upVoteComment(comment._id) } }>1</div>
                                                <div className="comment-down-vote" onClick={ () => { self._downVoteComment(comment._id) } }>0</div>
                                            </div>

                                            <div> comment:  {comment.body} </div>
                                            <div> upvotes:  {comment.upvotes} </div>
                                            <div> downvotes:  {comment.downvotes} </div>
                                            <div>
                                                <i className="fa fa-clock-o"></i> <TimeAgo time={ comment.createdAt }/>
                                            </div>
                                        </div>
                                        
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