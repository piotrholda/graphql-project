const mongoose = require('mongoose');
const MSchema = mongoose.Schema;

const hobbySchema = new MSchema({
          title: String,
          description: String,
          userId: String
});

var Hobby = mongoose.model('Hobby', hobbySchema);
module.exports = { Hobby };
