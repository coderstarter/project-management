const moongoose = require('mongoose');

const userData = moongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        task: {
            type: String,
            required: true,
        },
        start_date: {
            type: String,
            required: true,
        },
        end_date: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

const User = moongoose.model('User', userData);
module.exports = User