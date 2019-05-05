
# Bills, Congress Stuff

---

Names: Camilo Calvo-Alcaniz,  Evan Eisenberg, Asher Fink

Date:

Project Topic: Crowdsourced Quotes Page

URL:

---

<!-- NOTES -->
<!--
  Handlebars Pages:
  Homepage - laws and Bills
  View Bill
  view Laws
  view congressman
  Form submission
-->

### 1. Data Format and Storage

<!-- TODO: update this -->
Data point fields:
- `Field 1`: Text      `Type: String`

Schema:
```javascript
Bill: {
   text: String,
   authors: [String],
   date_introduced: String,
   committee: String,
   bill_id: Number,
   is_law: Boolean
}

Law: {
  text: String,
  authors: [String],
  date_introduced: String,
  date_passed: String,
  committee: String,
  bill_id: Number,
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
    url: 'http://localhost:3000/api/create',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
       quote: "To be or not to be",
       author: "William Shakespeare",
       year: 1603,
       popularity: "High",
       categories: ["Truth","Honesty"]
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getAll`

### 4. Search Data

Search Field: quote

### 5. Navigation Pages

Navigation Filters
1. Quotes about Science -> `/science`
2. Quotes about Truth -> `/truth`
3. Quotes from Thomas Jefferson -> `/jefferson`
4. Short -> `/short`
5. Long -> `/long`
