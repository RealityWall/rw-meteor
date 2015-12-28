Session.set('notifications', []);
Session.set('notificationId', 0);
pushNotificationToClient = (notification) => {
    let notifications = Session.get('notifications');
    notifications.push(notification);
    Session.set('notifications', notifications);
    Session.set('notificationId', Session.get('notificationId') + 1);
    setTimeout(() => {
        let notifications = Session.get('notifications');
        for (let i in notifications) {
            if (notifications[i].id == notification.id) {
                notifications.splice(i, 1);
                Session.set('notifications', notifications);
                break;
            }
        }
    }, 3000);
};