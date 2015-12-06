PostComponent = React.createClass({

    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            limit: 1
        }
    },

    _increaseLimit() {
        this.setState({limit: this.state.limit + 1});
    },

    getMeteorData() {
        return {
            ready: Meteor.subscribe("postsList", this.state.limit).ready(),
            posts: Posts.find({}).fetch()
        }
    },

    _submitPost(e) {
        e.preventDefault();
        Posts.insert({
           title: this.refs.title.value,
           body: this.refs.body.value
        });
    },

    _upVote(postId) {
        Meteor.call('upVotePost', postId);
    },

    _downVote(postId) {
        Meteor.call('downVotePost', postId);
    },

    render() {
        var self = this;
        return (
            <div>
                <h1>posts</h1>
                <div>
                    <form onSubmit={ self._submitPost }>
                        <input type="text" ref="title" required/>
                        <input type="text" ref="body" required/>
                        <input type="submit" value="SUBMIT"/>
                    </form>
                </div>
                <div>
                    {
                        self.data.ready ? null : <div>loading...</div>
                    }
                </div>
                <div>
                    {
                        self.data.posts.map((post, index) => {
                            return (
                                <div key={index}>
                                    <div><a href={'./posts/' + post._id}>{post.title}</a></div>
                                    <div>{post.body}</div>
                                    <div>upvotes : {post.upvotes}</div>
                                    <div>downvotes : {post.downvotes}</div>
                                    <button onClick={ () => { self._upVote(post._id) }}>up vote</button>
                                    <button onClick={ () => { self._downVote(post._id) }}>down vote</button>
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={ self._increaseLimit }>increase limit {self.state.limit }</button>
                <a href="../">back</a>
            </div>
        )
    }
});