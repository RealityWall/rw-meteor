const adds = [
    {title: 'Celio', imgSrc: '/img/pub_celio.png', city: 'Nice'},
    {title: 'Subway', imgSrc: '/img/pub_subway.png', city: 'Valbonne'},
    {title: 'Ibis', imgSrc: '/img/pub_ibis.png', city: 'Valbonne'}
];

WallAddsComponent = React.createClass({
    render() {
        return (
            <div className="wall-adds">
                {
                    adds.map( (add, index) => {
                        return (
                            <div key={index} className="wall-add">
                                <div className="wall-add-img">
                                    <img src={add.imgSrc} alt="" />
                                </div>
                                <div className="wall-add-description">
                                    <div className="wall-add-title">{add.title}</div>
                                    <div className="wall-add-city">{add.city}</div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
});