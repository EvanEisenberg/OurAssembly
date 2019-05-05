var mongoose = require('mongoose');

var congressMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    party: {
      type: String,
      required: true
    },
    year_inaugurated: {
      type: Number,
      required: true
    }
});


var CongressMember = mongoose.model('CongressMember', congressMemberSchema);

module.exports = CongressMember;
