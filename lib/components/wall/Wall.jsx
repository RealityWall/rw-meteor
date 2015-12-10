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
            readyForPosts: Meteor.subscribe('postsByWallId', this.props.id, this.state.limit).ready(),
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
                            <div className="wall-address">
                                {self.data.wall.address.address}
                            </div>
                            <div className="wall-postal-code">
                                {self.data.wall.address.postalCode} {self.data.wall.address.city}
                            </div>
                            <div className="wall-geolocation">
                                {self.data.wall.loc.lat}, {self.data.wall.loc.lon}
                            </div>
                            <div className="wall-map">
                                <img src="/img/gmap.png" alt="A remplacer par une vrai map clicable pour agrandir ou rediriger"/>
                            </div>

                            <div className="wall-adds">
                                <div className="wall-add">
                                    <div className="wall-add-img">
                                        <img src="/img/pub_celio.png" alt="" />
                                    </div>
                                    <div className="wall-add-description">
                                        <div className="wall-add-title">Celio</div>
                                        <div className="wall-add-city">Nice</div>
                                    </div>
                                </div>
                                <div className="wall-add">
                                    <div className="wall-add-img">
                                        <img src="/img/pub_subway.png" alt="" />
                                    </div>
                                    <div className="wall-add-description">
                                        <div className="wall-add-title">Subway</div>
                                        <div className="wall-add-city">Valbonne</div>
                                    </div>
                                </div>
                                <div className="wall-add">
                                    <div className="wall-add-img">
                                        <img src="/img/pub_ibis.png" alt="" />
                                    </div>
                                    <div className="wall-add-description">
                                        <div className="wall-add-title">Hotel Ibis</div>
                                        <div className="wall-add-city">Valbonne</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : null
                    }

                </div>
                
                <div className="posts-container">
                    {
                        self.data.posts.map( (post, index) => {
                            return <PostItemComponent post={post} key={index} />
                        })
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
                    <div className="post-up-votes" onClick={ self._upVote }><i className="fa fa-arrow-up"></i> {self.props.post.upvotes}</div>
                    <div className="post-down-votes" onClick={ self._downVote }><i className="fa fa-arrow-down"></i> {self.props.post.downvotes}</div>
                </div>
                <div className="post-description">
                    <div className="post-title"><a href={ '/posts/' + self.props.post._id }>{self.props.post.title}</a></div>
                    <div className="post-body">{self.props.post.body}</div>                
                    <div className="post-date"><i className="fa fa-clock-o"></i> 2 hours ago</div>
                    <div className="post-comments-number"><i className="fa fa-comment-o"></i> {self.props.post.commentCount} comments</div>
                    <div className="post-from"><i className="fa fa-user"></i> {self.props.post.author}</div>
                </div>
            </div>
        );
    }
});