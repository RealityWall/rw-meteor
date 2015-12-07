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
        this.register('commentsList', Meteor.subscribe('commentsList', params.postId));
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

// users auth
FlowRouter.route("/login", {
    action: () => {
        ReactLayout.render(LoginComponent, {});
    }
});

FlowRouter.route("/signin", {
    action: () => {
        ReactLayout.render(SigninComponent, {});
    }
});

