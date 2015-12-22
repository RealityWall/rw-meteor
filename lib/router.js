// Home
FlowRouter.route("/", {
    action: () => {
        ReactLayout.render(HomeComponent, {});
    }
});

FlowRouter.route("/sign-in", {
    triggersEnter: [function(context, redirect) {
        if (Meteor.user()) {
            redirect('/my-account');
        }
    }],
    action: () => {
        ReactLayout.render(SigninComponent, {});
    }
});

// Walls route
FlowRouter.route("/walls", {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect('/sign-in');
        }
    }],
    action: () => {
        ReactLayout.render(WallsComponent, {});
    },
    subscriptions: function() {
        this.register('wallsList', Meteor.subscribe('wallsList', 43.700000, 7.250000, 100000));
    }
});

FlowRouter.route("/walls/:wallId", {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect('/sign-in');
        }
    }],
    action: (params) => {
        ReactLayout.render(WallComponent, {id: params.wallId});
    },
    subscriptions: function(params) {
        this.register('wallById', Meteor.subscribe('wallById', params.wallId));
    }
});

FlowRouter.route("/walls/:wallId/post", {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect('/sign-in');
        } else {
            if (Meteor.user().profile.roles.indexOf('user') < 0) {
                redirect('/walls');
            }
        }
    }],
    action: (params) => {
        ReactLayout.render(WallPostComponent, {id: params.wallId});
    }
});

FlowRouter.route("/walls/:wallId/upload", {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect('/sign-in');
        } else {
            if (Meteor.user().profile.roles.indexOf('admin') < 0) {
                redirect('/walls');
            }
        }
    }],
    action: (params) => {
        ReactLayout.render(WallUploadComponent, {id: params.wallId});
    }
});

FlowRouter.route("/walls/:wallId/posts", {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect('/sign-in');
        } else {
            if (Meteor.user().profile.roles.indexOf('admin') < 0) {
                redirect('/walls');
            }
        }
    }],
    action: (params) => {
        ReactLayout.render(WallPostsComponent, {id: params.wallId});
    }
});


FlowRouter.route("/my-account", {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect('/sign-in');
        }
    }],
    action: () => {
        ReactLayout.render(UserSettingsComponent, {});
    }
});