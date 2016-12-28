var accounts_data = require('./data');
var treetrizer = require('./index');
var output = treetrizer.unflatten(accounts_data, 'account_path', '1', 'children');
console.log(output);