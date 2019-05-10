var app = require("./app");
var http = require('http').Server(app);
var io = require('socket.io')(http);

function saveApi(entry, type, res) {
    entry.save(function(err) {
        if(err) throw err
        return res.send(type + " saved!")
  });
}

function save(entry, type, redirect, res) {
    entry.save(function(err) {
        if(err) throw err
        io.emit('new ' + type, entry);
        res.redirect(redirect); // changed this - seems to work better
    });
}

module.exports = {
        saveApi: saveApi,
        save: save
};