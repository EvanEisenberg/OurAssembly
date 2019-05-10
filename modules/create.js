var CongressMember = require('../models/CongressMember');
var Bill = require('../models/Bill');
var Law = require('../models/Law');

function bill(textIn, authorsIn, dateIntroducedIn, committeeIn, nameIn) {
    console.log(textIn);
    var bill = new Bill({
        text: textIn,
        authors: authorsIn,
        date_introduced: dateIntroducedIn,
        committee: committeeIn,
        name: nameIn,
        preview: textIn.substring(0, 150)
    });

    return bill;
}

function law(textIn, authorsIn, datePassedIn, committeeIn, nameIn) {
    var law = new Law({
        text: textIn,
        authors: authorsIn,
        date_passed: datePassedIn,
        committee: committeeIn,
        name: nameIn,
        preview: textIn.substring(0, 150)
    });

    return law;
}

function congressMember(nameIn, partyIn, yearIn) {
    var congressMember = new CongressMember({
        name: nameIn,
        party: partyIn,
        year_inaugurated: yearIn
    });

    return congressMember;
}


module.exports = {
    bill: bill,
    law: law,
    congressMember: congressMember
}