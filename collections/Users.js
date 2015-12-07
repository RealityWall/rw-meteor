let userSchemaObject = {
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    votes: {
        type: Object,
        optional: true,
        blackbox: true
    },
    postCount: {
        type: Number
    },
    commentCount: {
        type: Number
    }
};
// TODO : add roles in an array

Meteor.users.attachSchema(userSchemaObject);