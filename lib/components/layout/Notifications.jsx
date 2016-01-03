Notifications = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            notifications: Meteor.isClient ? Session.get('notifications') : []
        }
    },

    render() {
        let self = this;
        return (
            <div className="notifications">
                {
                    self.data.notifications.map( (notification, index) => {
                        return (
                            <div key={index} className="notification animated fadeInRight">
                                <i className={"fa " +
                                    (notification.type == 'ERROR' ?
                                        'fa-close' : (notification.type == 'SUCCESS' ? 'fa-check' : (notification.type == 'INFO' ? 'fa-info':'') )) }></i>
                                { notification.message }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});