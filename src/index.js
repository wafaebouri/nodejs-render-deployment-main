const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// app.use((req, res) => {
//   res.send('Hello World!')
// })
app.use(bodyParser.json());
app.use(express.static("src/public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:127.0.0.1/mydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phno = req.body.phno;
  const password = req.body.password;

  const data = {
    name: name,
    email: email,
    phone: phno,
    password: password
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("signup_success.html");
});

app
  .get("/", (req, res) => {
    res.set({
      "Allow-access-Allow-Origin": "*"
    });
    return res.redirect("index.html");
  })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server listening on http://localhost:' + PORT)
})
