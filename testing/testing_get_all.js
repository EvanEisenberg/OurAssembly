var request = require("request");

var options = {
    method: 'GET',
    url: 'http://localhost:3000/api/getAllBillsAndLaws',
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
