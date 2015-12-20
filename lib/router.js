// Home
FlowRouter.route("/", {
    action: () => {
        ReactLayout.render(HomeComponent, {});
    }
});

FlowRouter.route("/posts/:postId", {
    action: (params) => {
        ReactLayout.render(SinglePostComponent, {id: params.postId});
    },
    subscriptions: function(params) {
        this.register('singlePost', Meteor.subscribe('singlePost', params.postId));
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
        ReactLayout.render(WallComponent, {id: params.wallId});
    },
    subscriptions: function(params) {
        this.register('wallById', Meteor.subscribe('wallById', params.wallId));
        this.register('postsByWallId', Meteor.subscribe('postsByWallId', params.wallId));
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

FlowRouter.route("/my-account", {
    triggersEnter: [function(context, redirect) {
        if (!Meteor.user()) {
            redirect('/signin');
        }
    }],
    action: () => {
        ReactLayout.render(UserSettingsComponent, {});
    }
});

FlowRouter.route("/users/:id", {
    action: (params) => {
        ReactLayout.render(UserProfileComponent, {id: params.id});
    }
});