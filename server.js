var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: process.env.PORT || 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "Employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
});
