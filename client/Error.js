Session.set('errors', []);
Session.set('errorId', 0);

pushErrorToClient = (error) => {
    let errors = Session.get('errors');
    errors.push(error);
    Session.set('errors', errors);
    Session.set('errorId', Session.get('errorId') + 1);
    setTimeout(() => {
        let errors = Session.get('errors');
        for (let i in errors) {
            if (errors[i].id == error.id) {
                errors.splice(i, 1);
                Session.set('errors', errors);
                break;
            }
        }
    }, 3000);
};