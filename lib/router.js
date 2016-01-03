// Home
FlowRouter.route("/", {
    triggersEnter: [function(context, redirect) {
        if (Meteor.user()) {
            redirect('/walls');
        }
    }],
    action: () => {
        ReactLayout.render(HomeComponent, {});
    }
});

// Walls route
FlowRouter.route("/walls", {
    action: () => {
        ReactLayout.render(WallsComponent, {});
    },
    subscriptions: function() {
        this.register('wallsList', Meteor.subscribe('wallsList', 43.700000, 7.250000, 100000));
    }
});

FlowRouter.route("/walls/:wallId", {
    action: (params) => {
        ReactLayout.render(WallGalleryComponent, {id: params.wallId});
    },
    subscriptions: function(params) {
        this.register('wallById', Meteor.subscribe('wallById', params.wallId));
    }
});

FlowRouter.route("/walls/:wallId/post", {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect('/');
        } else {
            if (Meteor.user().profile.roles.indexOf('user') < 0) {
                redirect('/walls');
            }
        }
    }],
    action: (params) => {
        ReactLayout.render(WallPostFormComponent, {id: params.wallId});
    }
});

FlowRouter.route("/walls/:wallId/upload", {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect('/');
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
            redirect('/');
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
            redirect('/');
        }
    }],
    action: () => {
        ReactLayout.render(UserSettingsComponent, {});
    }
});

FlowRouter.route("/reset-password/:token", {
    action: (params) => {
        ReactLayout.render(ResetPasswordForm, {token: params.token});
    }
});

if (Meteor.isClient) {
    FlowRouter.route('/walls/:wallId/posts/:date/pdf/:userId', {
        action: () => {}
    });

    FlowRouter.notFound = {
        action: () => {
            ReactLayout.render(NotFoundComponent, {});
        }
    };
}