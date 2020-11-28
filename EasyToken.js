const fs = require("fs")


String.prototype.insert = function(index, string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substr(index);
    }
  
    return string + this;
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

    if(options.characters == "ABC") {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    };
    if(options.characters == "123") {
        characters = '0123456789';
    };
    if(options.characters == "ABC123") {
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    };
    
    callback = callback || function () {}
    for(var i = 0; i < 16; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    };

    
    
    result = result.insert(4, "-");
    result = result.insert(9, "-");
    result = result.insert(14, "-");

    if(fs.existsSync(options.database)) {
        fs.appendFileSync(options.database, `\n${result} `, "utf-8");
    };

    if(options.lifetime != null && options.database == null) {
        return console.error("** ERROR: You cannot set a lifetime option if your database is not set. **")
    }else if (options.lifetime != "Infinite"){
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
}



module.exports = {
    createToken: createToken
}