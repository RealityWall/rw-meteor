WallPostsComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            readyForPosts: Meteor.subscribe('postsByWallId', Meteor.userId(), this.props.id).ready(),
            posts: Posts.find({}).fetch()
        }
    },

    render() {
        let self = this;
        return (
            <LayoutComponent>
                <div className="wall-upload-container">
                    POSTS
                    {
                        self.data.readyForPosts ?
                            <div>
                                {
                                    self.data.posts.map( (post, index) => {
                                        return (<div key={index}>
                                            <img src={post.author.imagePath} height="30"/>
                                            {post.author.name} :
                                            {post.body}
                                        </div>);
                                    })
                                }
                            </div>
                            : null
                    }
                </div>
            </LayoutComponent>
        )
    }
});