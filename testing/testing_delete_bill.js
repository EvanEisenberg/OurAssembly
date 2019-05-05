var request = require("request");

var options = {
    method: 'DELETE',
    url: 'http://localhost:3000/api/deleteBill',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        bill_id: 123
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
