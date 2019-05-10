
# OurAssembly Documentation

---

Names: Camilo Calvo-Alcaniz,  Evan Eisenberg, Asher Fink

Date: 5/10/19

Project Topic: Crowdsourced Bills and Laws

URL:

---

### 1. Data Format and Storage

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

HTML form route: `/create/bill` and `/create/law`

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

### 4. Search Data

Law a d Bill Search Field: `bill_id`

Congress Member Search Field: `name`

### 5. Navigation Pages

Pages for viewing data
1. Bills -> `/bills`
2. Laws -> `/laws`
3. Congress Members -> `/congressmembers`
4. About Us -> `/about`

Pages for posting data

5. Create Bill -> `/create/bill`
6. Create Law -> `/create/law`


