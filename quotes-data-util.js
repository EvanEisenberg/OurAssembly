var fs = require('fs');

function restoreOriginalData() {
    fs.writeFileSync('quotes.json', fs.readFileSync('quotes_original.json'));
}

function loadData() {
    return JSON.parse(fs.readFileSync('quotes.json'));
}

function saveData(data) {
	// poke.json stores the pokemon array under key "pokemon", 
	// so we are recreating the same structure with this object
	var obj = {
		quotes: data
	};

	fs.writeFileSync('quotes.json', JSON.stringify(obj));
}

module.exports = {
    restoreOriginalData: restoreOriginalData,
    loadData: loadData,
    saveData: saveData,
}
