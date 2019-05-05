var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/addCongressMember',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        name: "Chris Van Hollen",
        party: "Democrat",
        year_inaugurated: 2017
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
