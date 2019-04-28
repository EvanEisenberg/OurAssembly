
# Quotes to make you go "Wow"

---

Name: Camilo Calvo-Alcaniz

Date: 4/12/19

Project Topic: Crowdsourced Quotes Page

URL: 

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`: Quote       `Type: String`
- `Field 2`: Author      `Type: String`
- `Field 3`: Year        `Type: Number`
- `Field 4`: Popularity  `Type: String`
- `Field 5`: Categories  `Type: [String]`

Schema: 
```javascript
{
   quote: String,
   author: String,
   year: Number,
   popularity: String,
   categories: [String]
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