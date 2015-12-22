let userSchemaObject = {
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    profile: {
        type: Object
    },
    createdAt: {
        type: Date
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    postCount: {
        type: Number,
        optional: true
    },
    roles: {
        type: [String]
    }
};

//Meteor.users.attachSchema(userSchemaObject);