# EasyToken

### EasyToken allows you to create a simple 16 character token that can be used for anything!

### NPM: https://www.npmjs.com/package/@ksplat/easytoken

## Features

### 1. Allows you to write and store the tokens in a file!
### 2. Set lifetimes on your tokens so they get removed from your file after a certain time!
### 3. Select what characters are allowed in your token!

## Example

const EasyToken = require("../EasyToken");

var options = { <br>
    // The file where the token will be written too. Starts from the root. (OPTIONAL) <br>
    database: "test/test.txt", <br>
    // The characters that are allowed in the token. Put ABC for letters, 123 for numbers, or ABC123 for both. <br>
    characters: "ABC123", <br>
    // How long the token will last for in the database in milliseconds. Takes #, and "Infinite" (OPTIONAL, ONLY WORKS IF YOU LISTED A DATABASE) <br>
    lifetime: 5000 <br>
    // A boolean to determine if you want the result to be stored and return as a base64 encoded string. (OPTIONAL)
    base64Encode: true
}; <br>



EasyToken.createToken(options, (token) => { <br>
    console.log(token) <br>
}); <br>



