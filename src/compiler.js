/*globals console, exports, process, require*/
/*jslint nomen: true*/

(function () {
    "use strict";

    var fs = require("fs"),
        argv = require("optimist").argv,
        input = argv._[0],
        output = argv._[1],
        SJ = function () {},
        result = "";

    SJ.prototype = {
        compile: function (inputLocation, outputLocation) {
            var input = fs.lstatSync(inputLocation);
    
            if (fs.existsSync(outputLocation)) {
                return this.err("Output location already exists. Please remove before compiling.");
            }
    
            if (input.isFile()) {
                return this.compileFile(inputLocation, outputLocation);
            } else {
                return this.err("Input and output locations should both be files.");
            }
        },
        compileCode: function (code) {
            return code.toString().split("").reverse().join("");
        },
        copyFile: function (inputFile, outputFile) {
            var code = fs.readFileSync(inputFile);

            fs.writeFileSync(outputFile, code);

            return this.ok();
        },
        compileFile: function (inputFile, outputFile) {
            var code = {},
                compiled = "";

            this.copyFile(inputFile, outputFile);
            code = fs.readFileSync(inputFile);

            if (this.endsWith(inputFile, ".js") || this.endsWith(inputFile, ".sj")) {
                compiled = this.compileCode(code);
            } else {
                return this.err("Please supply a .js or .sj file");
            }

            fs.writeFileSync(outputFile, compiled);

            return this.ok();
        },
        ok: function () {
            return {
                "ok": true
            };
        },
        err: function (status) {
            return {
                "ok": false,
                "status": status
            };
        },
        appendFileName: function (directory, file) {
            return directory + (this.endsWith(directory, "/") ? "" : "/") + file;
        },
        endsWith: function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
    };

    function printHelp() {
        console.log("Parameters usage:");
    }

    function printGreeting() {
        console.log("Welcome to the SJ compiler.\n");
    }

    printGreeting();

    if (!input || !output) {
        console.log("Please specify input and output");
        printHelp();
        process.exit(1);
    }

    result = new SJ().compile(input, output);

    if (result.ok) {
        console.log("Done!");
    } else {
        console.log("ERROR: " + result.status);
        process.exit(1);
    }

    exports.SJ = SJ;
}());