
# OurAssembly Documentation

---

Names: Camilo Calvo-Alcaniz, Evan Eisenberg, Asher Fink

Date: 5/10/19

Project Topic: Crowdsourced Bills and Laws

URL: https://ourassemblyapp.herokuapp.com/

---

### 1. Data Format and Storage

Schema:
```javascript
Bill: {
   text: String,
   authors: [String],
   date_introduced: String,
   committee: String,
   name: String,
   preview: String
}

Law: {
  text: String,
  authors: [String],
  date_passed: String,
  committee: String,
  name: String,
  preview: String
}

CongressMember: {
  name: String,
  party: String,
  year_inaugurated: Number
}
```

### 2. Add New Data

HTML form route: `/create/bill`, `/create/law`, and `/add/congressMember`

POST endpoint route: `/api/addBill`, `/api/addLaw`, and `/api/addCongressMember`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'https://ourassemblyapp.herokuapp.com/api/addBill',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        text: "Sample bill",
        authors: ["sample author 1", "sample author 2"],
        date_introduced: "november 3",
        committee: "committee on bill stuff",
        name: "Bill",
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. Delete Data
```javascript
var request = require("request");

var options = {
    method: 'DELETE',
    url: 'https://ourassemblyapp.herokuapp.com/api/deleteBill',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
        name: "Bill Name"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 4. API

GET endpoint routes:
* `/api/getAllBillsAndLaws`,
* `/api/getAllBills`
* `/api/getAllLaws`
* `/api/getAllCongressMembers`

POST endpoint routes:
* `/api/addBill`,
* `/api/addLaw,`
* `/api/addCongressMember`

DELETE endpoint routes:
* `/api/deleteBill`
* `/api/deleteLaw`
* `/api/deleteCongressMember`

### 5. Search Data

Law, Bill and Congress Member Search Field: `name`


### 6. Navigation Pages

Pages for viewing data
1. Bills -> `/bills`
2. Laws -> `/laws`
3. Congress Members -> `/congressmembers`
4. About Us -> `/about`

Pages for posting data

5. Create Bill -> `/create/bill`
6. Create Law -> `/create/law`
7. Add Congress Member -> `/add/congressMember`

### 7. Notification System (using sockets)
Whenever a bill or law is added, anyone else on the website gets a 2-second
notification saying new bill/law added, with the ID of the bill or law.

### 8. Two additional npm packages
We used `faker` while testing our program to generate fake data
We used `validator` to make validate input data on the back-end, such as requiring
bill IDs to be non-negative integers.

### 9. Two Modules
We put the functions to create new data points and the functions to save new data points into their own modules. This meant we could reuse code instead of having to write it out every time we used it. We also put the app variable in its own module so the other modules could access it.

### 10. Handlebars
We had 10 handlebars:
1. main: main handlebar.
2. about: about page
3. billpost: handlebar for individual bill information
4. congressMembers: handlebar for all congress members
5. creatbill: handlebar for creating new bills
6. createCongressMembers: handlebar for creating new congress members
7. createlaw: handlebar for creating new laws
8. home: home page. Displays all bills
9. lawpost: handlebar for individual law information
10. laws: handlebar for all laws
