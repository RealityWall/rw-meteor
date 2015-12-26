let monthsInYear= ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
let daysInWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
function getFrenchDate(date) {
    return daysInWeek[date.getDay()] + " " + date.getDate() + " " + monthsInYear[date.getMonth()] + " " + date.getFullYear();
}


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
                                        return (
                                            <div key={index}>
                                                <div className="date">
                                                    {
                                                        self._renderDate(post.createdAt, self.data.posts, index)
                                                    }
                                                </div>
                                                <div className="message">
                                                    <img src={post.author.imagePath} height="30"/>
                                                    {post.author.name} :
                                                    {post.body}
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            : null
                    }
                </div>
            </LayoutComponent>
        )
    },

    _renderDate(currentDate, posts, index) {
        let date1 = new Date(currentDate);
        if (index > 0) {
            let date2 = new Date(posts[index - 1].createdAt);
            if (date1.getDate() != date2.getDate()
                || date1.getMonth() != date2.getMonth()
                || date1.getFullYear() != date2.getFullYear()) {
                return (<span> { getFrenchDate(date1) } </span>);
            }
        } else {
            return (<span> { getFrenchDate(date1) } </span>)
        }
    }
});