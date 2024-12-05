const { Schema, model } = require("mongoose");

const passwordSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: false,
        default: 'www.xyz.com'
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: false,
        enum: ['Logins', 'OtherTypes']
    },
    category: {
        type: String,
        required: false,
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    logo: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/5339/5339184.png"
    }
});

module.exports = model('Password', passwordSchema)