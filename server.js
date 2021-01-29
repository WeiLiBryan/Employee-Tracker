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
    console.log("\n");
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

//  DEPARTMENT SECTION
// -------------------------------------------------------------------------------
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
                viewDepartments();
                break;
            case "Add Departments":
                addDepartment();
                break;
            case "Remove Departments":
                removeDepartment();
                break;
            case "View Department Budget":
                viewDepBudget();
                break;
        }
    });
}

// DISPLAYS ALL DEPARTMENTS IN TABLE
function viewDepartments() {
    var query = "SELECT * FROM department";
    var department = [];
    console.log("\n");
    connection.query(query, function(err,res) {
        for (var i = 0; i < res.length; i++){
            var currentDep = {
                id: res[i].id, 
                department_name: res[i].name
            };
            department.push(currentDep);
            // console.table(res[i].id, res[i].name);
        }
        console.table(department);

        department = [];
        init();
    });
}

// ADDS A NEW DEPARTMENT
function addDepartment() {
    inquirer.prompt({
        name: "depName",
        type: "input",
        message: "What would you like to name the new department?"
    }).then(data => {
        var query = "INSERT INTO department (name) VALUES (?)";
        connection.query(query, (data.depName), (err, res) => {
            if (err) throw err;
            console.log("Department Added");
            init();
        });
    });
}

// REMOVES A DEPARTMENT
function removeDepartment() {
    var query = "SELECT name FROM department";
    var depNames = [];
    connection.query(query, (err,res) => {
        if (err) throw err;
        // PUSH ALL DEPARTMENT NAMES INTO ARRAY FOR CHOICES
        for (var i = 0; i < res.length; i++){
            depNames.push(res[i].name);
        }

        inquirer.prompt({
            name: "delDep",
            type: "list",
            message: "Which department would you like to remove?",
            choices: depNames
        }).then(data => {
            query = "DELETE FROM department WHERE name = ?"
            connection.query(query, (data.delDep), (err, res) => {
                if (err) throw err;

                console.log(data.delDep + " deleted");

                init();
            });
        });
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