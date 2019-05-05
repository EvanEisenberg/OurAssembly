
# Bills, Congress Stuff

---

Names: Camilo Calvo-Alcaniz,  Evan Eisenberg, Asher Fink

Date:

Project Topic: Crowdsourced Quotes Page

URL:

---

### 1. Data Format and Storage

<!-- TODO: update this for each of: bill, law, congress member -->
Data point fields:
- `Field 1`: Text      `Type: String`

Schema:
```javascript
Bill: {
   text: String,
   authors: [String],
   date_introduced: String,
   committee: String,
   bill_id: Number
}

Law: {
  text: String,
  authors: [String],
  date_passed: String,
  committee: String,
  bill_id: Number
}

CongressMember: {
  name: String,
  party: String,
  year_inaugurated: Number
}
```

### 2. Add New Data

HTML form route: `/create`

POST endpoint route: `/api/create`

Example Node.js POST request to endpoint:
```javascript
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
        bill_id: 123
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getAllBillsAndLaws`

<!-- Past here not updated yet -->

### 4. Search Data

Search Field: quote

### 5. Navigation Pages

Navigation Filters
1. Quotes about Science -> `/science`
2. Quotes about Truth -> `/truth`
3. Quotes from Thomas Jefferson -> `/jefferson`
4. Short -> `/short`
5. Long -> `/long`
