"use strict";

module.exports = function(grunt){
    grunt.initConfig({
        copy: {
            install: {
                files: [
                    // makes all src relative to cwd
                    {expand: true, cwd: 'node_modules/', src: ['jquery/**'], dest: 'js/lib'},

                    // flattens results to a single level
                    {expand: true, cwd: 'node_modules/', src: ['underscore/**'], dest: 'js/lib'}
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");

    grunt.registerTask("install", "install lib", ["copy:install"]);
};