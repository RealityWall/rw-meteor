let map = null;
let markers = [];
let wallIcon = null;
if (Meteor.isClient) {
    wallIcon = L.icon({
        iconUrl: '/img/wall_icon.gif',
        iconRetinaUrl: '/img/wall_icon.gif',
        iconSize: [50, 50]
    });
}

OpenStreetMapComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            ready: Meteor.subscribe('wallsList', 43.700000, 7.250000, 100000).ready(),
            walls: Walls.find({}).fetch()
        }
    },

    getInitialState() {
        return {
            showUserStep: Meteor.isClient && window.location.search === '?next=post',
            showAdminStep: Meteor.isClient && window.location.search === '?next=upload'
            || Meteor.isClient && window.location.search === '?next=posts'
        };
    },

    componentDidMount() {

        L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
        map = L.map('walls-map').setView([43.700000, 7.250000], 11);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map);
        this.displayWalls();

        window.addEventListener('searchchange', this._onSearchChange);
    },

    componentWillUnmount() {
        window.removeEventListener('searchchange', this._onSearchChange);
    },

    _onSearchChange() {
        this.setState({
            showUserStep: Meteor.isClient && window.location.search === '?next=post',
            showAdminStep: Meteor.isClient && window.location.search === '?next=upload'
            || Meteor.isClient && window.location.search === '?next=posts'
        });
    },

    componentWillUpdate() {
        // remove all markers
        markers.forEach( (marker) => {
            map.removeLayer(marker);
        });
        markers = [];

        // draw all the walls
        this.displayWalls();
    },

    displayWalls() {
        this.data.walls.forEach( (wall) => {
            let marker = L.marker([wall.loc.lat, wall.loc.lon], {
                icon: wallIcon,
                clickable: true,
                title: wall.address.address + " "
                    + (wall.address.address2 ? (wall.address.address2 + " ") : "") + wall.address.postalCode + " " + wall.address.city.toUpperCase(),
                alt: 'wall icon'
            }).addTo(map);
            marker.addEventListener('click', () => {
                if (window.location.search == '?next=post') {
                    FlowRouter.go('/walls/' + wall._id + '/post');
                } else if (window.location.search == '?next=upload') {
                    FlowRouter.go('/walls/' + wall._id + '/upload');
                } else if (window.location.search == '?next=posts') {
                    FlowRouter.go('/walls/' + wall._id + '/posts');
                } else {
                    FlowRouter.go('/walls/' + wall._id);
                }
            });
            markers.push(marker);
        });
    },

    render() {
        return (
            <LayoutComponent>
                <div className="walls-wrapper">
                    <div id="walls-map"></div>
                    {
                        this.state.showUserStep || this.state.showAdminStep ?
                            <div className="step-wrapper">
                                <div className="step-1 animated tada">
                                    Choisissez un mur
                                </div>
                            </div>
                            : null
                    }
                </div>
            </LayoutComponent>
        )
    }
});