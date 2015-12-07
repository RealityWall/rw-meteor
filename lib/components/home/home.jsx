HomeComponent = React.createClass({
    render() {
        console.log(Meteor.user());
        return (
            <div>
                <h1>home</h1>
                <a href="./posts">view posts</a>
            </div>
        )
    }
});