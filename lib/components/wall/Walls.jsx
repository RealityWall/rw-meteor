WallsComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            ready: Meteor.subscribe('wallsList', 43.700000, 7.250000, 100000).ready(),
            walls: Walls.find({}).fetch()
        }
    },

    render() {
        let self = this;
        return (
            <LayoutComponent>
                <div className="walls-wrapper">
                    {
                        self.data.ready
                            ?
                            self.data.walls.map( (wall, index) => {
                                return <WallItemComponent wall={wall} key={index} />
                            })
                            :
                            <LoadingComponent />
                    }
                </div>
            </LayoutComponent>
        )
    }
});

WallItemComponent = React.createClass({
    render() {
        let self = this;
        return (
            <div className="wall-item">
                <div className="wall-adrress">
                    <a href={'/walls/' + self.props.wall._id }>{self.props.wall.address.address}<br/>
                        {self.props.wall.address.postalCode}
                        {self.props.wall.address.city}</a>
                </div>
                <div className="geolocation">
                    {self.props.wall.loc.lat}, {self.props.wall.loc.lng}
                </div>
            </div>
        );
    }
});