Errors = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            errors: Meteor.isClient ? Session.get('errors') : []
        }
    },

    render() {
        let self = this;
        return (
            <div className="errors">
                {
                    self.data.errors.map( (error, index) => {
                        return (
                            <div key={index} className="error animated fadeInRight">
                                { error.message }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
});