//require mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

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

connection.connect(function(err) {
  if (err) throw err;
  startBamazon();
});

function startBamazon() {
  queryAllItems();
}

// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && sign === 1) {
    return true;
  } else {
    return "Please enter a whole non-zero number.";
  }
}

function queryAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].price +
          " | " +
          res[i].stock_quantity
      );
    }
    console.log(
      "\n---------------------------------------------------------------------\n"
    );
    promptPurchase();
  });
}

function promptPurchase(params) {
  inquirer
    .prompt([
      {
        name: "item_id",
        type: "input",
        message:
          "What is the item_id of the product you would like to purchase?",
        validate: validateInput,
        filter: Number
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?",
        validate: validateInput,
        filter: Number
      }
    ])
    .then(function(input) {
      var item = input.item_id;
      var quantity = input.quantity;

      // Query db to confirm that the given item ID exists in the desired quantity
      var queryStr = "SELECT * FROM products WHERE ?";

      connection.query(queryStr, { item_id: item }, function(err, data) {
        if (err) throw err;

        if (data.length === 0) {
          console.log("Error: Invalid Item ID. Please select a valid Item ID");
          queryAllItems();
        } else {
          var productData = data[0];

          if (quantity <= productData.stock_quantity) {
            console.log(
              "The product you requested is in stock. Your order is being placed."
            );

            // Construct the updating query string
            var updateStock =
              "UPDATE products SET stock_quantity = " +
              (productData.stock_quantity - quantity) +
              " WHERE item_id = " +
              item;

            var updateProductSales =
              "UPDATE products SET product_sales = " +
              (productData.product_sales + productData.price * quantity) +
              " WHERE item_id = " +
              item;

            // Update the product_sales column in the database
            connection.query(updateProductSales, function(err, data) {
              if (err) throw err;
              console.log("Updated product sales");
            });

            // Update the inventory
            connection.query(updateStock, function(err, data) {
              if (err) throw err;

              console.log(
                "Your oder has been placed! Your total is $" +
                  productData.price * quantity
              );
              console.log("Thank you for shopping with us!");
              console.log(
                "\n---------------------------------------------------------------------\n"
              );

              // End the database connection
              connection.end();
            });
          } else {
            console.log(
              "Sorry, there is not enough product in stock, your order can not be placed."
            );
            console.log("Please modify your order.");
            console.log(
              "\n---------------------------------------------------------------------\n"
            );

            queryAllItems();
          }
        }
      });
    });
}
