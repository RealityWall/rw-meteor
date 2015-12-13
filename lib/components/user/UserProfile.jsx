UserProfileComponent = React.createClass({

    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            postsLimit: 10,
            commentsLimit: 10
        }
    },

    getMeteorData() {
        return {
            readyForPosts: Meteor.subscribe('postsByUserId', this.props.id, this.state.postsLimit),
            readyForComments: Meteor.subscribe('commentsByUserId', this.props.id, this.state.commentsLimit),
            posts: Posts.find({}).fetch(),
            comments: Comments.find({}).fetch()
        };
    },

    render() {
        let self = this;
        return (
            <LayoutComponent>
                user profile <br/>
                <h3>Posts</h3>
                <div className="posts">
                    {
                        self.data.posts.map( (post, index) => {
                            return (
                                <div key={index}>{post.title}</div>
                            )
                        })
                    }
                </div>
                <h3>Comments</h3>
                <div className="comments">
                    {
                        self.data.comments.map( (comment, index) => {
                            return (
                                <div key={index}>{comment.body}</div>
                            )
                        })
                    }
                </div>
            </LayoutComponent>
        );
    }
});