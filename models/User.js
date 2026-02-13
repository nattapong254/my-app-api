var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
    },
    { collection : 'users'}

)

module.exports = mongoose.model('User', UserSchema);
