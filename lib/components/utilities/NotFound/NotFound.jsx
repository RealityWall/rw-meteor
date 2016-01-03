NotFoundComponent = React.createClass({
    render() {
        return (
            <LayoutComponent>
                <div className="not-found-container">
                    <img src="/img/404.gif" alt="404 image"/>
                    <div className="text-info">
                        <i className="fa fa-info-circle"></i> Oops ! La page que vous avez demandée n'existe pas !
                    </div>
                </div>
            </LayoutComponent>
        );
    }
});