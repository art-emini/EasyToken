# EasyToken

### EasyToken allows you to create a simple 16 character token that can be used for anything!

### NPM: https://www.npmjs.com/package/@ksplat/easytoken

## Features

### 1. Allows you to write and store the tokens in a file!
### 2. Set lifetimes on your tokens so they get removed from your file after a certain time!
### 3. Select what characters are allowed in your token!

## Example

```js

const EasyToken = require("../EasyToken");

var options = {

    // The file where the token will be written too. Starts from the root. (OPTIONAL)
    database: "test/test.txt",

    // The characters that are allowed in the token. Put ABC for letters, 123 for numbers, or ABC123 for both.
    characters: "ABC123",

    // How long the token will last for in the database in milliseconds. Takes #, and "Infinite" (OPTIONAL, ONLY WORKS IF YOU LISTED A DATABASE)
    lifetime: 5000,

    // A boolean to determine if you want the result to be stored and return as a base64 encoded string.
    base64Encode: true,

    // A boolean to determine if you want the token to be broken up into 4 parts. (OPTIONAL)
    chunked: true
};


EasyToken.createToken(options, (token) => { 
    console.log(token) 
}); 

// OR Create a 6 digit random number with no options. 

var token = EasyToken.createShort(); 



```
