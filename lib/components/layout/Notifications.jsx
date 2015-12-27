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
            <div className="errors">
                {
                    self.data.notifications.map( (notification, index) => {
                        return (
                            <div key={index} className="error animated fadeInRight">
                                { notification.message }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});