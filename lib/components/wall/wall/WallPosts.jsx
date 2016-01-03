let monthsInYear= ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
let daysInWeek = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
function getFrenchDate(date) {
    return daysInWeek[date.getDay()] + " " + date.getDate() + " " + monthsInYear[date.getMonth()] + " " + date.getFullYear();
}

function getTime(date) {
    return date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
}


WallPostsComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            readyForPosts: Meteor.subscribe('postsByWallId', Meteor.userId(), this.props.id).ready(),
            posts: Posts.find({}, {sort: {createdAt: -1}}).fetch()
        }
    },

    render() {
        let self = this;
        return (
            <LayoutComponent>
                <div className="wall-posts-container">
                    {
                        self.data.readyForPosts ?
                            <div>
                                <AllPosts posts={self.data.posts}/>
                            </div>
                            : null
                    }
                </div>
            </LayoutComponent>
        )
    }
});

AllPosts = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            readyForImages: Meteor.subscribe('multipleProfileImage', this.props.posts.map( (post) => {
                if (post.author.imageId) return post.author.imageId;
            })).ready(),
            images: ProfileImages.find({}).fetch().forEach( (image) => {
                let posts = this.props.posts;
                for (let i = 0; i < posts.length; i++) {
                    if (posts[i].author.imageId == image._id) {
                        if (Meteor.isClient) posts[i].author.imagePath = image.url();
                    }
                }
            })
        }
    },

    hidePost(postId) {
        Meteor.call('hidePost', postId);
    },

    downloadPdf(date) {
        let win = window.open(
            "./posts/" + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
            + "/pdf/" + Meteor.userId()
            + "?token=" + Meteor.user().services.resume.loginTokens[0].hashedToken,
            '_blank'
        );
        win.focus();
    },

    render() {
        return (
            <div>
                {
                    this.props.posts.map( (post, index) => {
                        return (
                            <div key={index}>
                                <div className="date">
                                    {
                                        this._renderDate(post.createdAt, this.props.posts, index)
                                    }
                                </div>
                                <div className="message">
                                    <div className="delete"><i onClick={ () => { this.hidePost(post._id) }} className="fa fa-close"></i></div>
                                    <div className="user-img" style={{background: 'url("' + post.author.imagePath + '")'}}></div>
                                    <div className="user-name">
                                        {post.author.name} <span className="time"><i className="fa fa-clock-o"></i> { getTime(post.createdAt) }</span>
                                    </div>
                                    <div className="user-message">{post.body}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    },

    _renderDate(currentDate, posts, index) {
        let date1 = new Date(currentDate);
        if (index > 0) {
            let date2 = new Date(posts[index - 1].createdAt);
            if (date1.getDate() != date2.getDate()
                || date1.getMonth() != date2.getMonth()
                || date1.getFullYear() != date2.getFullYear()) {
                return (
                    <div>
                        { getFrenchDate(date1) }&nbsp;&nbsp;
                        <a onClick={ () => {this.downloadPdf(date1);}}>
                            (<i className="fa fa-download"></i> télécharger)
                        </a>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    { getFrenchDate(date1) }&nbsp;&nbsp;
                    <a onClick={ () => {this.downloadPdf(date1);}}>
                        (<i className="fa fa-download"></i> télécharger)
                    </a>
                </div>
            );
        }
    }

});