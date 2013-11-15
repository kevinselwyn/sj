/*globals module*/

module.exports = function (grunt) {
    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
                        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
            },
            build: {
                files: {
                    "dist/sj.min.js": ["src/sj.js"]
                }
            }
        }
    });

    grunt.registerTask("default", ["uglify"]);
};