WallComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            readyForWall: Meteor.subscribe('wallById', this.props.id).ready(),
            wall: Walls.findOne({})
        }
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
                        </div>
                        : null
                    }

                </div>
            </LayoutComponent>
        )
    }
});