DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
 item_id INT(10) AUTO_INCREMENT UNIQUE NOT NULL,
 product_name VARCHAR(70) NOT NULL,
 department_name VARCHAR(70) NOT NULL,
 price INT(50) NOT NULL,
 stock_quantity INT(50) NOT NULL,
 PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("strawberries", "produce", 3, 100),
("bananas", "produce", 1, 2000),
("radio", "technology", 15, 70),
("iPhone", "technology", 1000, 10),
("UT athletics jersey", "clothing", 50, 150),
("Longhorn sundress", "clothing", 45, 200),
("burnt orange blanket", "home goods", 14, 500),
("chairs", "home goods", 24, 630),
("bedsheets", "home goods", 30, 700),
("turkey slices", "deli", 10, 90);

SELECT * FROM products;
