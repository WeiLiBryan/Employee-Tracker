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

// -------------------------------------------------------------------------------
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
            "Remove Departments"
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
            // case "View Department Budget":
            //     viewDepBudget();
            //     break;
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

// DISPLAYS THE TOTAL SALARY OF ALL THE EMPLOYEES
// function viewDepBudget() {};

// -------------------------------------------------------------------------------
//  ROLE SECTION
// -------------------------------------------------------------------------------

function roleNav() {
    inquirer.prompt({
        name: "roleNav",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Roles",
            "Add a New Role",
            "Remove a Role"
        ]
    }).then(res => {
        switch(res.roleNav){
            case "View All Roles":
                viewRoles();
                break;
            case "Add a New Role":
                addRole();
                break;
            case "Remove a Role":
                removeRole();
                break;
        }
    });
}

// DISPLAYS ALL ROLES
function viewRoles() {
    var query = "SELECT * FROM role";
    var role = [];
    console.log("\n");
    connection.query(query, function(err,res) {
        for (var i = 0; i < res.length; i++){
            var currentRole = {
                id: res[i].id, 
                title: res[i].title,
                salary: res[i].salary,
                department_id: res[i].department_id
            };

            role.push(currentRole);
        }

        console.table(role);

        role = [];
        init();
    });
}

// ADDS ROLE TO DB
function addRole() {
    var query = "SELECT * FROM department";
    var departments = [];
    var depNames = [];
    connection.query(query, (err,res) => {
        if (err) throw err;

        // PUSH ALL DEPARTMENT NAMES INTO ARRAY FOR CHOICES
        for (var i = 0; i < res.length; i++){
            departments.push(res[i]);
            depNames.push(departments[i].name);
        }

        inquirer.prompt([
            {
                name: "roleName",
                type: "input",
                message: "What is the role?"
            },
            {
                name: "roleSal",
                type: "input",
                message: "What is the salary for the role?"
            },
            {
                name: "roleDep",
                type: "list",
                message: "What is the department for the role?",
                choices: depNames
            }
        ]).then(data => {
            var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
            var chosenID;

            // ITERATES THROUGH WHOLE ARRAY AND GRABS ID OF SELECTED DEPARTMENT
            for (var m = 0; m < departments.length; m++){
                if(departments[m].name === data.roleDep){
                    chosenID = departments[m].id;
                }
            }

            connection.query(query, [data.roleName, data.roleSal, chosenID], (err, res) => {
                if (err) throw err;

                console.log(data.roleName + " added to roles");
                init();
            });
        });  
    });
}

// REMOVES ROLE FROM DB
function removeRole() {
    var query = "SELECT title FROM role";
    var roleNames = [];
    connection.query(query, (err,res) => {
        if (err) throw err;
        // PUSH ALL DEPARTMENT NAMES INTO ARRAY FOR CHOICES
        for (var i = 0; i < res.length; i++){
            roleNames.push(res[i].title);
        }

        inquirer.prompt({
            name: "delRole",
            type: "list",
            message: "Which role would you like to remove?",
            choices: roleNames
        }).then(data => {
            query = "DELETE FROM role WHERE title = ?"
            connection.query(query, (data.delRole), (err, res) => {
                if (err) throw err;

                console.log(data.delRole + " deleted");

                init();
            });
        });
    });
}

// -------------------------------------------------------------------------------
//  EMPLOYEE SECTION
// -------------------------------------------------------------------------------

function empNav() {
    inquirer.prompt({
        name: "empNav",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add New Employee",
            "Remove Employee",
            "View Employee by Department",
            "View Employee by Manager",
            "Update Employee Manager"
        ]
    }).then(res => {
        switch(res.depNav){
            case "View All Employees":
                viewEmployees();
                break;
            case "Add New Employee":
                addEmployee();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "View Employee by Department":
                viewEmployeeDep();
                break;
            case "View Employee by Manager":
                viewEmployeeManager();
                break;
            case "Update Employee Manager":
                updateEmployeeManager();
                break;
        }
    });
}

// VIEWS ALL EMPLOYEES IN DB
function viewEmployees() {
    var query = "SELECT * FROM employee";
    var employee = [];
    console.log("\n");
    connection.query(query, function(err,res) {
        for (var i = 0; i < res.length; i++){
            var currentEmp = {
                id: res[i].id, 
                first_name: res[i].first_name,
                last_name: res[i].last_name,
                role_id: res[i].role_id,
                manager_id: res[i].role_manager_id
            };

            employee.push(currentEmp);
        }

        console.table(employee);

        employee = [];
        init();
    });
}

function addEmployee() {
    
}

function removeEmployee() {

}

function viewEmployeeDep() {

}

function viewEmployeeManager() {

}

function updateEmployeeManager() {
    
}