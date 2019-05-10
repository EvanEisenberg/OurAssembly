var mongoose = require('mongoose');

var lawSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    authors: {
        type: [String]
    },
    date_passed: {
        type: String,
        required: true
    },
    committee: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    preview: {
      type: String,
      required: true
    }
});


var Law = mongoose.model('Law', lawSchema);

module.exports = Law;
