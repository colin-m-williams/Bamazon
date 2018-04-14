# Bamazon

The ninth assingment for UNC Coding Bootcamp. In this assignment, I made Bamazon, a CLI storefront app. The app has three interfaces: Customer, Manager, and Supervisor.

### Description

The **Customer** interface allows the user to purchase items from the inventory. First all available inventory is displayed for the user to view. The user is asked to enter the product id of the item they want to purchase. Next the user is asked to enter the quantity of the item. The user is then notified if the order was placed succesfully or if there was insufficient stock.

[Customer Demo](https://drive.google.com/file/d/1f4JqF2VdF7ScGDpJusFbaRmxL2G-Lg-j/view)

---

The **Manager** interface allows the user to execute one of four options: View products for sale, View Low Inventory, Add to Inventory, and Add New Inventory.

* The **View Products for Sale** option allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located, price, and the quantity available in stock.

* The **View Low Inventory** option shows the user the items which currently have fewer than 100 units available.

* The **Add to Inventory** option allows the user to select a given item ID and add additional inventory to the target item.

* The **Add New Product** option allows the user to enter details about a new product which will be entered into the database upon completion of the form.

[Manager Demo](https://drive.google.com/file/d/1jjPSHJprLyhTvjXYV6ogyrvPH9SQvrnD/view)

---

The **Supervisor** interface allows the user two options to choose from: View Product Sales by Department, or Create New Department.

* The **View Product Sales by Department** option displays a table with column headings of department id, department name, overhead costs, total sales, and total profit. The data returned is ordered by department id and grouped by department name.

[Supervisor Demo](https://drive.google.com/file/d/1WDf-by0vFD3g8HxTb_S8qG7Vlr_OGZML/view)

---

## Built With

* javascript
* MySQL
* node packages
  * mysql
  * inquirer
  * cli-table
