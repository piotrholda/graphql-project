const mongoose = require('mongoose');
const MSchema = mongoose.Schema;

const postSchema = new MSchema({
          comment: String,
          userId: String
});

var Post = mongoose.model('Post', postSchema);
module.exports = { Post };
