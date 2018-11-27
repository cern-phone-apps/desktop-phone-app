const url = require("url");
const minimist = require("minimist");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// get port from passed in args from scripts/start.js
const port = minimist(process.argv.slice(2)).port;

// parse regular form submission bodies
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(morgan("dev"));
app.use(cookieParser());
app.disable('etag');

app.use(function(req, res, next) {
  res.type("application/json");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-CSRF-TOKEN"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/OAuth/Authorize", urlencodedParser, (req, res, next) => {
  // if this matches the secret username and password
  // if (matchesUsernameAndPassword(req.body)) {
  // assume we always have this query param property
  const redirectTo = req.query.redirect_uri;

  // parse the redirectTo invalid a valid URL object
  const outgoing = url.parse(redirectTo);

  // and add these query params to it with an arbitrary
  // id_token (for a simple example)
  outgoing.query = { code: "abc123def456" };

  res.redirect(outgoing.format());
  // } else {
  //   res.sendStatus(401);
  // }
});

app.post("/auth/v1/login/", (req, res, next) => {
  // console.log("Cookies: ", req.cookies);
  res.clearCookie("csrf_access_token");
  res.clearCookie("csrf_refresh_token");
  // console.log("LOOK HERE");
  // console.log(res);
  res.cookie("csrf_access_token", "abcd1234", { httpOnly: false });
  res.cookie("csrf_refresh_token", "abcd1234", { httpOnly: false });
  res.json({
    login: true
  });
  // console.log("RES 2");
  // console.log(res);
  res.send();
});

app.delete("/auth/v1/logout/", (req, res, next) => {
  console.log("Cookies: ", req.cookies);
  // cookies.set('csrf_access_token', 'abcd1234');
  res.clearCookie("csrf_access_token");
  res.clearCookie("csrf_refresh_token");
  res
    .json({
      logout: true
    })
    .send();
});

app.get("/api/v1/users/me/", (req, res, next) => {
  res.json({
    firstName: "John",
    lastName: "Doe",
    phone: "555 123 456",
    mobile: "456 123 555",
    email: "john.doe@cern.ch",
    username: "johndoe55"
  });
  console.log(req.cookies);
  res.send();
});

app.get("/api/v1/numbers/", (req, res, next) => {
  res.json({
    result: [
      {
        phoneNumber: "88001"
      },
      {
        phoneNumber: "88002"
      },
      {
        phoneNumber: "88003"
      },
      {
        phoneNumber: "88004"
      },
      {
        phoneNumber: "88005"
      }
    ]
  });

  res.send();
});

app.get("/api/v1/users/search/", (req, res, next) => {
  res.json({
    result: [
      {
        displayName: "Test 1",
        phones: [
          {
            number: "88001",
            phoneType: "phone"
          }
        ],
        mail: "test1@cern.ch",
        cernSection: "TEST_SEC",
        cernGroup: "TEST_GROUP",
        division: "TEST_DIVISION",
        physicalDeliveryOfficeName: "No office",
        username: "test80001",
        personId: "test80001"
      },
      {
        displayName: "Test 2",
        phones: [
          {
            number: "88002",
            phoneType: "phone"
          }
        ],
        mail: "test2@cern.ch",
        cernSection: "TEST_SEC",
        cernGroup: "TEST_GROUP",
        division: "TEST_DIVISION",
        physicalDeliveryOfficeName: "No office",
        username: "test80002",
        personId: "test80002"
      },
      {
        displayName: "Test 3",
        phones: [
          {
            number: "88003",
            phoneType: "phone"
          }
        ],
        mail: "test3@cern.ch",
        cernSection: "TEST_SEC",
        cernGroup: "TEST_GROUP",
        division: "TEST_DIVISION",
        physicalDeliveryOfficeName: "No office",
        username: "test80003",
        personId: "test80003"
      },
      {
        displayName: "Test 4",
        phones: [
          {
            number: "88004",
            phoneType: "phone"
          }
        ],
        mail: "test4@cern.ch",
        cernSection: "TEST_SEC",
        cernGroup: "TEST_GROUP",
        division: "TEST_DIVISION",
        physicalDeliveryOfficeName: "No office",
        username: "test80004",
        personId: "test80004"
      },
      {
        displayName: "Test 5",
        phones: [
          {
            number: "88005",
            phoneType: "phone"
          }
        ],
        mail: "test5@cern.ch",
        cernSection: "TEST_SEC",
        cernGroup: "TEST_GROUP",
        division: "TEST_DIVISION",
        physicalDeliveryOfficeName: "No office",
        username: "test80005",
        personId: "test80005"
      }
    ]
  });

  res.send();
});

app.get("/api/v1/users/", (req, res, next) => {
  res.json({
    result: {
      displayName: "Test 4",
      phones: [
        {
          number: "88004",
          phoneType: "phone"
        }
      ],
      mail: "test4@cern.ch",
      cernSection: "TEST_SEC",
      cernGroup: "TEST_GROUP",
      division: "TEST_DIVISION",
      physicalDeliveryOfficeName: "No office",
      username: "test80004",
      personId: "test80004"
    }
  });

  res.send();
});

app.listen(port, () => {});
