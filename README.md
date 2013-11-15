#sj

sj is an obfuscated JavaScript file format

##Compiler

A sj Node compiler is included in this project. It converts ordinary js files to sj files for use in the browser:

```
node src/compiler.js input.js output.sj
```

##Decoder

After you have compiled your sj file, you can include it in your HTML project:

```html
<script data-main="file.sj" src="src/sj.js"></script>
```

The value for `data-main` should be filename of your sj file.

##Support

* Google Chrome
* Firefox
* IE8+
* Safari
* Opera