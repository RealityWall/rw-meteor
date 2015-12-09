WallComponent = React.createClass({

    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            limit: 10
        }
    },

    getMeteorData() {
        return {
            readyForWall: Meteor.subscribe('wallById', this.props.id).ready(),
            readyForPosts: Meteor.subscribe('postsByWallId', this.props.id).ready(),
            wall: Walls.findOne({}),
            posts: Posts.find({}).fetch()
        }
    },

    _increaseLimit() {
        this.setState({limit: this.state.limit + 10});
    },

    _submitPost(e) {
        e.preventDefault();
        Meteor.call('insertPost', this.props.id, this.refs.title.value, this.refs.body.value);
    },

    render() {
        let self = this;
        return (
            <LayoutComponent>
                <div className="wall-info">
                    {/* TODO : build wall info component */}
                    { self.data.wall ?
                        <div>
                            <div className="wall-adrress">
                                {self.data.wall.address.address}<br/>
                                {self.data.wall.address.postalCode}
                                {self.data.wall.address.city}
                            </div>
                            <div className="geolocation">
                                {self.data.wall.loc.lat}, {self.data.wall.loc.lng}
                            </div>
                        </div>
                    : null
                    }

                </div>
                <div className="add-post-form">
                    {/* TODO : build form component */}
                    <form onSubmit={ self._submitPost }>
                        <input type="text" ref="title" required/>
                        <input type="text" ref="body" required/>
                        <input type="submit" value="SUBMIT"/>
                    </form>
                </div>
                <div className="posts-container">
                    {
                        self.data.posts.map( (post, index) => {
                            return <PostItemComponent post={post} key={index} />
                        })
                    }
                </div>
                {
                    self.data.wall && self.data.posts.length == self.data.wall.postCount
                        ? null :
                        <button onClick={ self._increaseLimit }>increase limit {self.state.limit }</button>
                }
            </LayoutComponent>
        )
    }
});

PostItemComponent = React.createClass({

    _upVote() {
        Meteor.call('upVotePost', this.props.post._id);
    },

    _downVote() {
        Meteor.call('downVotePost', this.props.post._id);
    },

    render() {
        var self = this;
        return (
            <div className="post-item">
                <div className="post-votes">
                    <div className="post-up-votes"><i className="fa fa-arrow-up"></i> {self.props.post.upvotes}</div>
                    <div className="post-down-votes"><i className="fa fa-arrow-down"></i> {self.props.post.downvotes}</div>
                </div>
                <div className="post-description">
                    <div className="post-title"><a href={ '/posts/' + self.props.post._id }>{self.props.post.title}</a></div>
                    
                    <div className="post-body">{self.props.post.body}</div>                
                    <div className="post-date">2 hours ago</div>
                    <div className="post-comments-number">{self.props.post.commentCount} comments</div>
                    <div className="post-from"><i className="fa fa-user"></i>Jean Michel</div>
                </div>
                <div className="uselessButton">
                    <button onClick={ self._upVote }>upvote</button>
                    <button onClick={ self._downVote }>downvote</button>
                </div>
            </div>
        );
    }
});