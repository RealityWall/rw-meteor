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

    render() {
        let self = this;
        return (
            <LayoutComponent>
                <div className="wall-info">
                    {/* TODO : build wall info component */}
                    { self.data.wall ?
                        <div>
                            <div className="wall-address">{self.data.wall.address.address}</div>
                            <div className="wall-postal-code">{self.data.wall.address.postalCode} {self.data.wall.address.city}</div>
                            <div className="wall-geolocation">{self.data.wall.loc.lat}, {self.data.wall.loc.lon}</div>
                            <div className="wall-map">
                                <img src="/img/gmap.png" alt="A remplacer par une vrai map clicable pour agrandir ou rediriger"/>
                            </div>

                            <WallAddsComponent/>
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

                <AddPostFormComponent wallId={self.props.id}/>

                {
                    self.data.wall && self.data.posts.length == self.data.wall.postCount
                        ? null :
                        <button onClick={ self._increaseLimit }>increase limit {self.state.limit }</button>
                }
            </LayoutComponent>
        )
    }
});