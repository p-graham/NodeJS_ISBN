
/*
Author: Phil Graham
Purpose: Accepts ISBN numbers as console arguments, returns information about the books in question
 */
var http = require("http");
var key = require("./API_KEYS.json");

//Print out message
function printMessage(ISBN, title, author, publisher, awards)
{
    var message = "ISBN: " + ISBN + "\n Title: " + title
        + "\n Author: " + author + "\n Published: " + publisher
        + "\n Awards: " + awards;
    console.log(message);
}

//Print out error messages
function printError(error)
{
    console.error(error.message);
}
function get(ISBN) {
    //Connect to the API URL
    var request = http.get("http://isbndb.com/api/v2/json/" + key.bookSearch.APIKey + "/books?q=" + ISBN, function (response) {
        var body = "";
        //Read the data
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
                try {
                    //Parse the data
                    var profile = JSON.parse(body);
                    //Print the data
                    printMessage(ISBN, profile.data[0].title, profile.data[0].author_data[0].name,
                        profile.data[0].publisher_text, profile.data[0].awards_text);
                } catch (error) {
                    //Parse error here
                    printError(error);
                }
        });
    });

    //Connection Error
    request.on("error", printError);
}

module.exports.get = get;