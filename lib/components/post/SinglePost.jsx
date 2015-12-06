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

    render() {
        var self = this;
        return (
            <div>
                <h1>Single</h1>
                <div>
                    <div>
                        <div>{self.data.post.title}</div>
                        <div>{self.data.post.body}</div>
                        <div>upvotes : {self.data.post.upvotes}</div>
                        <div>downvotes : {self.data.post.downvotes}</div>
                        <div>comments : { self.data.post.commentCount }</div>
                    </div>
                </div>
                <div>
                    <form onSubmit={ self._submitComment }>
                        <input type="text" ref="comment" required/>
                        <input type="submit" value="SUBMIT COMMENT"/>
                    </form>
                </div>
                <div>
                    {
                        self.data.comments.map( (comment, index) => {
                            return (
                                <div key={index}>
                                    <div> comment:  {comment.body} </div>
                                    <div> upvotes:  {comment.upvotes} </div>
                                    <div> downvotes:  {comment.downvotes} </div>
                                    <button onClick={ () => { self._upVoteComment(comment._id) } }>upVote</button>
                                    <button onClick={ () => { self._downVoteComment(comment._id) } }>downVote</button>
                                </div>
                            )
                        })
                    }
                </div>
                <a href="../">back</a>
            </div>
        )
    }
});