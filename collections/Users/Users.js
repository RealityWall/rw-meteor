let userSchemaObject = {
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
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
        type: Number,
        optional: true
    },
    commentCount: {
        type: Number,
        optional: true,
    },
    roles: {
        type: [String]
    }
};

Meteor.users.attachSchema(userSchemaObject);