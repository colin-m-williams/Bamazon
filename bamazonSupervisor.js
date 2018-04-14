//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

//create connection to db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "duke",
  database: "bamazon_DB"
});

// connect to the db
connection.connect(function(err) {
  if (err) throw err;
  startBamazon();
});

function promptSupervisor() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "Please select an option:",
        choices: ["View Product Sales by Department", "Create New Department"],
        filter: function(val) {
          if (val === "View Product Sales by Department") {
            return "sales";
          } else if (val === "Create New Department") {
            return "newDept";
          } else {
            // this case should be unreachable
            console.log("ERROR: Unsupported operation!");
            exit(1);
          }
        }
      }
    ])
    .then(function(input) {
      // trigger appropriate action based on the user input
      if (input.option === "sales") {
        displayDeptSales();
      } else if (input.option === "newDept") {
        addNewDept();
      }
    });
}

// displayDeptSales will retrieve the current inventory from the database and output it to the console
function displayDeptSales() {
  // create new cli table
  var salesTable = new Table({
    head: [
      "Department ID",
      "Department Name",
      "Overhead Cost",
      "Product Sales",
      "Total Profit"
    ],
    colWidths: [5, 25, 15, 15, 15]
  });
  // construct the db query string
  queryStr =
    "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales " +
    "FROM departments " +
    "INNER JOIN products " +
    "ON departments.department_name=products.department_name " +
    "GROUP BY departments.department_name " +
    "ORDER BY departments.department_id";

  // make the db query
  connection.query(queryStr, function(err, data) {
    if (err) throw err;

    for (var i = 0; i < data.length; i++) {
      // variables to store column data
      var deptId = data[i].department_id;
      var deptName = data[i].department_name;
      var overhead = data[i].over_head_costs;
      var productSales = data[i].product_sales;
      var totalProfit = productSales - overhead;
      // push column data into table for each department
      salesTable.push([deptId, deptName, overhead, productSales, totalProfit]);
    }
    // print table to console
    console.log(salesTable.toString());

    // End the database connection
    connection.end();
  });
}

// validateNumeric makes sure that the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
  // Value must be a positive number
  var number = typeof parseFloat(value) === "number";
  var positive = parseFloat(value) > 0;

  if (number && positive) {
    return true;
  } else {
    return "Please enter a positive number for the unit price.";
  }
}

function addNewDept() {
  // prompt the user to gather department info
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Please enter the department name."
      },
      {
        type: "input",
        name: "over_head_costs",
        message: "Please enter the overhead cost for the department.",
        validate: validateNumeric
      }
    ])
    .then(function(input) {
      // variables to store department info
      var deptName = input.departmentName;
      var overheadC = input.overheadCosts;
      console.log(
        "Adding New Department: \n     department_name = " +
          input.department_name +
          "\n" +
          "     over_head_costs = " +
          input.over_head_costs
      );

      // Create the insertion query string
      var queryStr = "INSERT INTO departments SET ?";

      // Add new department to the db
      connection.query(queryStr, input, function(err, res, fields) {
        if (err) throw err;

        console.log("New department has been added to the database");
        console.log(
          "department_id = " +
            res.insertId +
            " department_name = " +
            input.department_name +
            " over_head_costs = " +
            input.over_head_costs
        );
        console.log(
          "\n---------------------------------------------------------------------\n"
        );

        // End the database connection
        connection.end();
      });
    });
}

function startBamazon() {
  promptSupervisor();
}
