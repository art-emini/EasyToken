const EasyToken = require("../EasyToken");

var options = {
    // The file where the token will be written too. Starts from the root. (OPTIONAL)
    database: "test/test.txt",
    // The characters that are allowed in the token. Put ABC for letters, 123 for numbers, or ABC123 for both.
    characters: "ABC123",
    // How long the token will last for in the database in milliseconds. Takes #, and "Infinite" (OPTIONAL, ONLY WORKS IF YOU LISTED A DATABASE)
    lifetime: 5000
};



EasyToken.createToken(options, (token) => {
    console.log(token)
});





