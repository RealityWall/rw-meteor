Deps.autorun(function(){
    Meteor.subscribe('userData');
});

Meteor.autosubscribe(function(){
    Meteor.subscribe('currentAccessToken');
});