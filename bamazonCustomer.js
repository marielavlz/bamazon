var mysql = require("mysql");
var inquirer = require("inquirer");

var amountOwed;

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id: ' + connection.threadId);
});

//Displays all items available in store and then starts an order function
function showProducts(){
	connection.query('SELECT * FROM products', function(err, res){
		if (err) throw err;
		console.log('=================================================');
		console.log('=================Items in Store==================');
		console.log('=================================================');

		for(i=0; i<res.length; i++){
			console.log('Item ID:' + res[i].item_id + ' Product Name: ' + res[i].product_name + ' Price: ' + '$' + res[i].price + '(Quantity left: ' + res[i].stock_quantity + ')')
		}
		console.log('=================================================');
		startOrder();
		})
};

//The prompts that display on the terminal
var startOrder = function(){
  inquirer.prompt([{
    name: "id",
    type: "input",
    message: "Enter the ID of the product you wish to purchase."
  },
  {
    name: "quantity",
    type: "input",
    message: "How much of this product would you like? Enter a number."
  }]).then(function(answer) {
    connection.query('SELECT * FROM products WHERE item_id = ?', [answer.id], function(err, res){

    if(answer.quantity > res[0].stock_quantity){
			console.log('Insufficient Quantity');
			console.log('This order has been cancelled');
			placeNewOrder();
		}

    else{
			amountOwed = res[0].price * answer.quantity;
  			console.log('Thanks for your order');
  			console.log('You owe $' + amountOwed);
  			console.log('');
			//Now we update products table
			connection.query('UPDATE products SET ? WHERE ?', [{
				stock_quantity: res[0].stock_quantity - answer.quantity
			},{
				item_id: answer.id
			}], function(err, res){});
			placeNewOrder();
		}
  })
})
};

//Allows the user to place a new order or end the connection
function placeNewOrder(){
	inquirer.prompt([{
		name: 'choice',
    type: 'rawlist',
		message: 'Would you like to place another order?',
    choices: ["YES", "NO"]
	}]).then(function(answer){
		if(answer.choice === "YES"){
			startOrder();
		}
		else{
			console.log('Thank you for shopping at Bamazon!');
			connection.end();
		}
	})
};

showProducts();
