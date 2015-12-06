FlowRouter.route("/", {
    action: () => {
        ReactLayout.render(HomeComponent, {});
    }
});

FlowRouter.route("/posts", {
    action: () => {
        ReactLayout.render(PostComponent, {});
    },
    subscriptions: function() {
        this.register('postsList', Meteor.subscribe('postsList'));
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

