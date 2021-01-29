var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: process.env.PORT || 3306,

  user: "root",

  password: "password",
  database: "Employee_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  init();
});

// UPON STARTING THE APP
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
        // SWITCH TO NAVIGATE THROUGH WHICH OPTION
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

function departmentNav() {
    inquirer.prompt({
        name: "depNav",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "Add Departments",
            "Remove Departments",
            "View Department Budget"
        ]
    }).then(res => {
        switch(res.depNav){
            case "View All Departments":
                break;
            case "Add Departments":
                break;
            case "Remove Departments":
                break;
            case "View Department Budget":
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