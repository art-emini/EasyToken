const fs = require("fs")


String.prototype.insert = function(index, string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substr(index);
    }
  
    return string + this;
};

function chunkStr(str, size) {
    const numChunks = Math.ceil(str.length / size);
    const chunks = new Array(numChunks);
  
    for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    };
  
    return chunks;
};


/**
 * 
 * @param {object} options An object that holds the options such as the "database" to write to, and the "characters". If none present it will generate a 16 character long (Letters and numbers) token not including hyphens. (OPTIONAL)
 * @param {function} callback The callback. (OPTIONAL)
 */

function createToken(options, callback) {
    var characters;
    var result = "";

    options = options || {
        characters: "ABC123"
    }

    options.database = options.database || null;
    options.lifetime = options.lifetime || null;
    options.base64Encode = options.base64Encode || false;
    options.chunked = options.chunked || false;
    options.chunkSize = options.chunkSize || null;
    options.length = options.length || 16;

    if(options.characters == "ABC") {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    };
    if(options.characters == "123") {
        characters = '0123456789';
    };
    if(options.characters == "ABC123") {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    };
    
    callback = callback || function () {};
    for(var i = 0; i < options.length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    };

    // chunk
    if (options.chunked == true && options.length % 2 == 0 && options.chunkSize >= 1) {
        result = chunkStr(result, options.chunkSize);
        // now an array
        result.forEach(subStr => {
            var index = result.indexOf(subStr);
            var l = result.length;
            var old = subStr;
            if(index != result.length - 1) {
                result[index] = old + "-";
            };
        });
        result = result.toString();
        result = result.replace(/,/g, "");
    };
    

    if(options.base64Encode == true) {
        result = Buffer.from(result).toString('base64');
    };

    if(fs.existsSync(options.database)) {
        fs.appendFileSync(options.database, `\n${result} `, "utf-8");
    };

    if(options.lifetime != null && options.database == null) {
        return console.error("** ERROR: You cannot set a lifetime option if your database is not set. **")
    }else if (options.lifetime != "Infinite" && options.database != null){
        setTimeout(() => {
            var data = fs.readFileSync(options.database, 'utf-8');
            var newValue = data.replace(result, '');
            fs.writeFileSync(options.database, newValue, 'utf-8');
            data = fs.readFileSync(options.database, 'utf-8');
            newValue = data.replace(/(^[ \t]*\n)/gm, '');
            fs.writeFileSync(options.database, newValue, 'utf-8');
        }, options.lifetime);
    };

    callback(result);

    return result;
};

/**
 * @param characters *Optional* Put "ABC" or "123", if undefined, it will return a number.
 * @description Creates a 6 digit random number or letters with only one option to make it simple.
 */

function createShort(c) {
    var result = "";
    var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    c = c || "123"

    if(c == "ABC") {
        for(var i = 0; i < 6; i++ ) {
            result += abc.charAt(Math.floor(Math.random() * abc.length));
        };
        return result;
    }

    if(c == "123") {
        return Math.floor(100000 + Math.random() * 900000);
    }
}


module.exports = {
    createToken: createToken,
    createShort: createShort
};