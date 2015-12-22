// Helpers for right Method
isUserById = (userId) => {
    return Meteor.users.findOne({
        _id: userId,
        'profile.roles': 'user'
    });
};

isAdminById = (userId) => {
    return Meteor.users.findOne({
        _id: userId,
        'profile.roles': 'admin'
    });
};

hasAlreadyPostedToday = () => {
    let postDate = Meteor.user().lastPost;
    if (postDate) {
        postDate = new Date(postDate);
        let currentDate = new Date();
        return postDate.getFullYear() == currentDate.getFullYear()
            && postDate.getMonth() == currentDate.getMonth()
            && postDate.getDay() == currentDate.getDay()
    } else {
        return false;
    }
};

isBetween7and22 = () => {
    let currentHour = (new Date()).getHours();
    return currentHour >= 7 && currentHour < 22;
};