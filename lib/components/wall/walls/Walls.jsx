let map = null;
let markers = [];

WallsComponent = React.createClass({

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
        map = new google.maps.Map(document.getElementById('walls-map'), {
            center: {lat: 43.700000, lng: 7.250000},
            zoom: 10,
            disableDefaultUI: true
        });
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
            marker.setMap(null);
        });
        markers = [];

        // draw all the walls
        this.displayWalls();
    },

    displayWalls() {

        CustomMarker.prototype = new google.maps.OverlayView();
        function CustomMarker(latlng, map, args) { this.latlng = latlng; this.args = args; this.setMap(map); }
        CustomMarker.prototype.remove = function() { if (this.div) { this.div.parentNode.removeChild(this.div); this.div = null; }};
        CustomMarker.prototype.getPosition = function() { return this.latlng; };
        CustomMarker.prototype.draw = function() {
            let self = this;
            let div = this.div;
            if (!div) {
                div = this.div = document.createElement('div');

                div.className = 'custom-marker';
                div.innerHTML = '<img src="img/wall_pictogram.png"/><div class="badge">' + this.args.postCount + '</div>';

                if (typeof(self.args.marker_id) !== 'undefined') div.dataset.marker_id = self.args.marker_id;
                google.maps.event.addDomListener(div, "click", function(event) {google.maps.event.trigger(self, "click");});
                let panes = this.getPanes();
                panes.overlayImage.appendChild(div);
            }

            let point = this.getProjection().fromLatLngToDivPixel(this.latlng);
            if (point) { div.style.left = point.x + 'px'; div.style.top = point.y + 'px'; }
        };

        this.data.walls.forEach( (wall) => {
            let marker = new CustomMarker(new google.maps.LatLng(wall.loc.lat, wall.loc.lon), map, {postCount: wall.postCount});
            marker.addListener('click', () => {
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
                        this.state.showUserStep ?
                            <div className="step-wrapper">
                                <div className="step-1 animated tada">
                                    <span className="step-title">étape 1 :</span> Choisissez un mur
                                </div>
                            </div>
                            : null
                    }

                    {
                        this.state.showAdminStep ?
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