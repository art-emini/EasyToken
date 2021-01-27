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

    // The file where the token will be written too. Starts from the root. Must b e a textfile. (OPTIONAL)
    database: "test/test.txt",

    // The characters that are allowed in the token. Put ABC for letters, 123 for numbers, or ABC123 for both.
    characters: "ABC123",

    // How long the token will last for in the database in milliseconds. Takes #, and "Infinite" (OPTIONAL, ONLY WORKS IF YOU LISTED A "DATABASE"(textfile))
    lifetime: 5000,

    // A boolean to determine if you want the result to be stored and return as a base64 encoded string. (OPTIONAL)
    base64Encode: false,

    // A boolean to determine if you want the token to be broken up into 4 parts, only works if length is an even number. (OPTIONAL)
    chunked: true,

    // A number to determine the size of the each chunk. Only works if chunked = true. (OPTIONAL)
    chunkSize: 3,

    // The length of your token, returns a 16 digit token if not defined. **Only works correctly if base64Encode is false** (OPTIONAL)
    length: 12
};



EasyToken.createToken(options, (token) => {
    console.log(token)
});

// takes one parameter which determines if you want numbers(123) or letters(ABC)

console.log(EasyToken.createShort("ABC"));


```
