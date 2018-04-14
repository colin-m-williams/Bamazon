DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT(11) NOT NULL,
  product_sales DECIMAL(10, 2),
  PRIMARY KEY (item_id)
);

CREATE TABLE departments(
  department_id INT(11) NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(255) NOT NULL,
  over_head_costs DECIMAL(10, 2),
  PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Xbox One', 'Gaming', '299.99', '10', '0');

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Playstation 4', 'Gaming', '299.99', '10', '0');

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Nintendo Switch', 'Gaming', '299.99', '10', '0');

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('50" inch 4K Ultra HD TV', 'TVs', '349.99', '15', '0');

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('60" inch 4K Ultra HD TV', 'TVs', '599.99', '15', '0');

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('70" inch 4K Ultra HD TV', 'TVs', '1299.99', '15', '0');

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Fire TV Stick', 'Streaming Media Players', '39.99', '20', '0');

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Roku Streaming Stick', 'Streaming Media Players', '49.99', '20', '0');

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Google Chromecast', 'Streaming Media Players', '35.00', '20', '0');

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Blu-ray Player', 'DVD & Blu-ray', '199.99', '20', '0');

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Gaming", '7499.70');

INSERT INTO departments (department_name, over_head_costs)
VALUES ('TVs', '28499.55');

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Streaming Media Players', '2199.60');

INSERT INTO departments (department_name, over_head_costs)
VALUES ('DVD & Blu-ray', '3499.80');