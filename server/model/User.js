const mongoose = require('mongoose');
const MSchema = mongoose.Schema;

const userSchema = new MSchema({
        name: String,
        age: Number,
        profession: String
});

var User = mongoose.model('User', userSchema);
module.exports = { User };
