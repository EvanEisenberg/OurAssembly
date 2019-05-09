var mongoose = require('mongoose');

var billSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true
    },
    date_introduced: {
        type: String,
        required: true
    },
    committee: {
      type: String,
      required: true
    },
    bill_id: {
      type: Number,
      required: true
    },
    preview: {
      type: String,
      required: true
    }
});


var Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
