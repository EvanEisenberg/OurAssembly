var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/addBill',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        text: "Sample bill",
        authors: ["sample author 1", "sample author 2"],
        date_introduced: "november 3",
        committee: "committee on bill stuff",
        bill_id: 123789
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
