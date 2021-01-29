var mysql = require("mysql");
var inquirer = require("inquirer");

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
  init();
});

function init() {
    inquirer.prompt({
        name: "nav",
        type: "list",
        message: "What would you like to view/edit?",
        choices: [
            "Departments",
            "Roles",
            "Employees"
        ]
    }).then(res => {
        switch(res.nav){
            case "Departments":
                departmentNav();
                break;

            case "Roles":
                roleNav();
                break;

            case "Employees":
                empNav();
                break;
        }
    });
}



// "View All Departments",
// "Add Departments",
// "Remove Departments",
// "View Department Budget",
// "View All Roles",
// "Add New Role",
// "Remove Role",
// "View All Employees"
// "Add New Employee",
// "Remove Employee",
// "View Employee by Department",
// "View Employee by Manager",
// "Update Employee Manager",