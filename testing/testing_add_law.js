var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/addLaw',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        text: "Sample law",
        authors: ["sample author 1", "sample author 2"],
        date_passed: "february 8",
        committee: "committee on bill stuff",
        bill_id: 123
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
