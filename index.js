var book = require("./ISBN_Search.js");
var ISBN = process.argv.slice(2);
ISBN.forEach(book.get);
