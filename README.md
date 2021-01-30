# Employee Tracker

----------------------

## Table of Contents

[Description](#Description) |
[Prerequisites](#Prerequisites) |
[Technologies](#Technologies-Used) |
[Video Walkthrough](#Video-Walkthrough) |
[Code Snippet](#Code-Snippet) |
[Authors](#Authors) |
[License](#License) |
[Acknowledgements](#Acknowledgements) |

## Description

Command line application that will take in department, role and employee information and output it on a table

## Prerequisites

None

## Technologies Used

- Node
- Javascript
- Inquirer
- mySQL

## Video Walkthrough

[Youtube Link](https://youtu.be/xGsUnz24wAU)

## Code Snippet

```Javascript
var query = "SELECT first_name, last_name, id FROM employee";
    var empName = [];
    var name;
    connection.query(query, (err,res) => {
        if (err) throw err;
        // PUSH EMPLOYEE FIRST AND LAST NAME INTO ARRAY FOR CHOICES
        for (var i = 0; i < res.length; i++){
            // NAME FOR INQUIRER CHOICES
            name = res[i].first_name;
            name += " ";
            name += res[i].last_name;
            empName.push(name);
        }
        
        inquirer.prompt({
            name: "delEmp",
            type: "list",
            message: "Which employee would you like to remove?",
            choices: empName
        }).then(data => {
            // CHOSEN EMPLOYEE

            var chosenEmp = data.delEmp.split(" ");
            var chosenName = chosenEmp[0];

            query = "DELETE FROM employee WHERE first_name = ?"
            connection.query(query, (chosenName), (err, res) => {
                if (err) throw err;

                console.log(data.delEmp + " has been removed");

                init();
            });
        });
    });
```

## Authors

1. **William W. Bryan**

- [Github](https://github.com/WeiLiBryan)
- [LinkedIn](https://www.linkedin.com/in/william-bryan-72730019a/)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Acknowledgements

- [Stack Overflow](https://stackoverflow.com)
- [w3schools](https://w3schools.com)

### [Back to Table of Contents](#table-of-contents)