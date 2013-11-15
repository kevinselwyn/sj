/*globals console, document, window, XMLHttpRequest*/
/*jslint evil: true*/

(function (document, window, undefined) {
    "use strict";

    var SJ = {
        vars: {
            code: "",
            script: {},
            url: ""
        },
        setup: function () {
            var scripts = document.getElementsByTagName("script"),
                script = scripts[scripts.length - 1],
                url = script.getAttribute("data-main");

            if (!url || url === "" || url.search(/^\S*\.sj$/) === -1) {
                console.log("Error: Missing a .sj file");
                return false;
            }

            this.vars.script = script;
            this.vars.url = url;

            return true;
        },
        load: function (callback) {
            var $this = this,
                url = this.vars.url,
                xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    callback(xhr.responseText);
                }
            };

            xhr.open("get", url, true);
            xhr.send(null);

            return this;
        },
        decode: function (code) {
            eval(code.split("").reverse().join(""));

            return this;
        },
        init: function () {
            var $this = this;

            if (!this.setup()) {
                return false;
            }

            this.load(this.decode);
        }
    };

    SJ.init();
}(document, window));