const mongoose = require('mongoose');
const MSchema = mongoose.Schema;

const userSchema = new MSchema({
        name: String,
        age: number,
        profession: String
})

module.exports = mongoose.model('User', userSchema)
