'use strict';

module.exports = function (grunt){
    grunt.initConfig({
        bower: {
            install: {
            }
        },

        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            },
            all: ['src/js/**/*.js', 'test/js/**/*.js']
        },

        karma: {
            options: {
                configFile: 'karma.conf.js',
                runnerPort: 9992
            },
            unit: {},
            watch: {
                autoWatch : false,
                singleRun : true
            }
        },

        watch: {
            scripts: {
                files: ['test/js/**/*.js', 'src/js/**/*.js'],
                tasks: ['jshint:all', 'karma:watch']
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build:debug', 'Resolve dependencies, lint, unit test', [
        'bower:install', 'jshint:all', 'karma:watch']);

    grunt.registerTask('dev', 'Debug build, then watch for changes, lint, and unit test',
        ['build:debug', 'watch'])
};