let monthsInYear= ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
let daysInWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
function getFrenchDate(date) {
    return daysInWeek[date.getDay()] + " " + date.getDate() + " " + monthsInYear[date.getMonth()] + " " + date.getFullYear();
}

WallComponent = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            readyForWall: Meteor.subscribe('wallById', this.props.id).ready(),
            wall: Walls.findOne({}),
            currentUser: Meteor.user()
        }
    },

    getInitialState() {
        return {
            hide: '',
            dateToDisplay: new Date()
        };
    },

    ////////////////////////////////////////////
    ////////////// GALLERY HELPERS /////////////
    ////////////////////////////////////////////
    _initSlider(url, date) {
        $("#current-picture").iviewer({
            src: url,
            ui_disabled: true,
            mousewheel: false
        });
        this.setState({dateToDisplay: date});
    },
    _updateSlider(url, date) {
        let currentPicture = $('#current-picture');
        currentPicture.iviewer('loadImage', url);
        currentPicture.iviewer('fit');
        this.setState({dateToDisplay: date});
    },
    _zoomBy(number) {
        $('#current-picture').iviewer('zoom_by', number);
    },
    _fit() {
        $('#current-picture').iviewer('fit');
    },
    _previous() { this.refs.pictureItems.previous(); },
    _next() { this.refs.pictureItems.next() },
    _setHide(newHide) { this.setState({hide: newHide}) },



    componentDidMount() {
        window.addEventListener('keydown', this._handleKeyboard);
    },
    componentWillUnmount() {
        window.removeEventListener('keydown', this._handleKeyboard);
    },
    _handleKeyboard(e) {
        if (e.which == 37) {
            this._previous();
        } else if (e.which == 39) {
            this._next();
        }
    },

    render() {
        let self = this;
        return (
            <LayoutComponent>
                <div className="wall-gallery-container">
                    {/* TODO : build wall info component */}
                    { self.data.wall ?
                        <div className="wall-info">
                            <div className="wall-address">{self.data.wall.address.address}</div>
                            <div className="wall-postal-code">{self.data.wall.address.postalCode} {self.data.wall.address.city}</div>
                            <div className="wall-geolocation">{self.data.wall.loc.lat}, {self.data.wall.loc.lon}</div>
                        </div>
                        : null
                    }

                    {
                        self.data.wall && self.data.wall.pictures.length > 0 ?
                            <div className="current-date"> { getFrenchDate(self.state.dateToDisplay) }</div>
                            :
                            <div>
                                désolé bro y'a pas d'image ici !
                            </div>
                    }

                    <div className={"slider-container " + (self.data.wall && self.data.wall.pictures.length > 0 ? "" : "hidden")} >
                        <div id="current-picture"></div>
                        {
                            self.state.hide === 'previous' || self.state.hide === 'all' ?
                                null:
                                <div className="previous" onClick={ self._previous }><i className="fa fa-chevron-left"></i></div>
                        }
                        {
                            self.state.hide === 'next' || self.state.hide === 'all' ?
                                null:
                                <div className="next" onClick={ self._next }><i className="fa fa-chevron-right"></i></div>
                        }
                        <div className="controls">
                            <div onClick={ () => { self._zoomBy(-1); }}><i className="fa fa-search-minus fa-2x"></i></div>
                            <div onClick={ self._fit }><i className="fa fa-arrows-alt fa-2x"></i></div>
                            <div onClick={ () => { self._zoomBy(1); }}><i className="fa fa-search-plus fa-2x"></i></div>
                        </div>
                    </div>

                    {
                        self.data.wall ?
                            <div>
                                <div className="gallery-description">
                                    <div>
                                        <div className="message">Choisissez l&#x27;image à agrandir</div>
                                        <div className="picture-number">2/15</div>
                                    </div>
                                </div>
                                <PictureItems
                                    init={ self._initSlider }
                                    update={ self._updateSlider }
                                    setHide={ self._setHide }
                                    ref="pictureItems"
                                    images={ self.data.wall.pictures }/>
                            </div>
                            : null
                    }
                </div>
            </LayoutComponent>
        )
    }
});

PictureItems = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            readyForWallImage: Meteor.subscribe('multipleWallImage', this.props.images.map( (picture) => {
                return picture.id;
            })).ready(),
            wallImages: WallImages
                .find({})
                .fetch()
                .map( (image) => {
                    let result = {};
                    for (let i in this.props.images) {
                        if (this.props.images[i].id == image._id) {
                            if (Meteor.isClient) result.url = image.url();
                            result.date = this.props.images[i].date;
                            break;
                        }
                    }
                    return result;
                }).sort( (a, b) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                })
        }
    },

    getInitialState() {
        return {
            currentUrl: ''
        };
    },

    componentDidMount() {
        if (this.data.wallImages.length > 0) {
            this.props.init(this.data.wallImages[0].url, this.data.wallImages[0].date);
            this.setState({currentUrl: this.data.wallImages[0].url});
            this.props.setHide('previous');
            if (this.data.wallImages.length == 1) this.props.setHide('all');
        }
    },

    componentDidUpdate() {
        if (this.state.currentUrl == '' && this.data.wallImages.length == this.props.images.length && this.data.wallImages.length > 0) {
            this.props.init(this.data.wallImages[0].url, this.data.wallImages[0].date);
            this.setState({currentUrl: this.data.wallImages[0].url});
            this.props.setHide('previous');
            if (this.data.wallImages.length == 1) this.props.setHide('all');
        }
    },

    _updateSlider(url, date) {
        this.props.update(url, date);
        this.setState({currentUrl: url});

        let pictures = this.data.wallImages;
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i].url == url) {
                if (i == 0 && i == pictures.length - 1) {
                    this.props.setHide('all');
                } else if (i == 0) {
                    this.props.setHide('previous');
                } else if (i == pictures.length - 1) {
                    this.props.setHide('next');
                } else {
                    this.props.setHide('');
                }
                break;
            }
        }
    },

    next() {
        let pictures = this.data.wallImages;
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i].url == this.state.currentUrl) {
                if (i < pictures.length - 1) {
                    this.props.update(pictures[i+1].url, pictures[i+1].date);
                    this.setState({currentUrl: pictures[i+1].url});
                    if (i == pictures.length - 2)  this.props.setHide('next');
                    else this.props.setHide('');
                } else {
                    this.props.setHide('next');
                }
                break;
            }
        }
    },

    previous() {
        let pictures = this.data.wallImages;
        for (let i = 0; i < pictures.length; i++) {
            if (pictures[i].url == this.state.currentUrl) {
                if (i > 0) {
                    this.props.update(pictures[i-1].url, pictures[i-1].date);
                    this.setState({currentUrl: pictures[i-1].url});
                    if (i == 1) this.props.setHide('previous');
                    else this.props.setHide('');
                } else {
                    this.props.setHide('previous');
                }
                break;
            }
        }
    },

    render() {
        let self = this;
        return (
            <div className="pictures">
                {
                    self.data.wallImages ?
                             self.data.wallImages.map( (image, index) => {
                                return Meteor.isClient ?
                                        <div key={index} className={"picture "+ (image.url == self.state.currentUrl ? "selected":"")} style={{backgroundImage: "url('"+image.url+"')"}} 
                                            onClick={ () => {
                                                self._updateSlider(image.url, image.date);
                                            }}>
                                        </div>
                                    : null
                            }) 
                        : null
                }
            </div>
        );
    }

});