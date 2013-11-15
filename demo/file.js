(function (document, window, undefined) {
	"use strict";

	var Test = {
		output: function (text) {
			alert(text);
		}
	};

	Test.output("Secret code executed!");
}(document, window));