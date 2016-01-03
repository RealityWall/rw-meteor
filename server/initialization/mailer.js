Meteor.mail = new Meteor.Mailer({
    login: 'X',
    host: 'X',
    connectionUrl: 'X',
    accountName: "Reality Wall",
    verbose: true,
    intervalTime: 120,
    retryTimes: 10,
    saveHistory: true,
    template:  '<html lang="{{lang}}">' +
                    '<head> ' +
                        '<meta charset="utf-8"> ' +
                        '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">' +
                        ' <title>{{{subject}}}</title> ' +
                        '<meta name="viewport" content="width=device-width">' +
                    '</head>' +
                    '<body>' +
                        '{{{message}}}' +
                    '</body>' +
                '</html>'
});

Meteor.methods({
    sendMail(to, subject, message) {
        Meteor.mail.send(
            {
                to: to,
                message: message,
                subject: subject,
                appname: "Reality Wall",
                url: process.env.ROOT_URL ? process.env.ROOT_URL : 'http://localhost:3000', // that is on the footer of the message (eg) reality wall
                lang: 'fr'
            }
            ,
            (error, success, recipient) => {
                if (error) console.log("mail is not sent to ", recipient);
                if (success) console.log("mail successfully sent to ", recipient);
            }
        );
    }
});

Meteor.startup(() => {

    function toCamelCase(name) {
        if (name.length == 1) return name.toUpperCase();
        return name.substr(0, 1).toUpperCase() + name.substr(1, name.length).toLowerCase()
    }

    process.env.MAIL_URL = 'X';

    Accounts.emailTemplates = {
        from: 'Reality Wall <noreply@realitywall.com>',
        siteName: 'Reality Wall',
        verifyEmail: {
            subject: function() {
                return '[Reality Wall] Email de vérification';
            },
            text: function(user, url) {
                return 'Bonjour ' + toCamelCase(user.profile.firstname) + " " + toCamelCase(user.profile.lastname) + ',\n\n' +
                    'Cliquez sur le lien ci dessous pour valider votre compte sur notre site reality-wall.com:\n'
                    + url + '\n\n' +
                    "Toute l'équipe de Reality Wall vous souhaite la bienvenue et vous remercie pour l'intérêt que vous portez à notre plateforme !";
            }
        },
        resetPassword: {
            subject: function() {
                return '[Reality Wall] Mot de passe oublié';
            },
            text: function(user, url) {
                return 'Bonjour ' + toCamelCase(user.profile.firstname) + " " + toCamelCase(user.profile.lastname) + ',\n\n' +
                    'Vous avez fait une demande pour réinitialiser votre mot de passe.\n' +
                    'Cliquez sur le lien ci dessous :\n'
                    + url + '\n\n' +
                    "Toute l'équipe de Reality Wall vous remercie pour l'intérêt que vous portez à notre plateforme !";
            }
        }
    };

});

