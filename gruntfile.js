'use strict';

module.exports = function (grunt){
    grunt.initConfig({
        bower: {
            install: {
            }
        },

        copy: {
            debug: {
                files: [
                    { expand: true, src: ['src/*.js'], 
                    dest: 'build/debug/js', flatten: true },

                    { expand: true, src: ['src/mine_sweeper_board/*.js'],
                    dest: 'build/debug/js/mine_sweeper_board', flatten: true},

                    { expand: true, src: ['src/mine_sweeper_board/*.css'],
                    dest: 'build/debug/css', flatten: true},

                    { expand: true, src: ['src/mine_sweeper_game/*.js'],
                    dest: 'build/debug/js/mine_sweeper_game', flatten: true},

                    { expand: true, src: ['src/mine_sweeper_game/*.css'],
                    dest: 'build/debug/css', flatten: true},

                    { expand: true, src: ['src/timer/*.js'],
                    dest: 'build/debug/js/timer', flatten: true},

                    { expand: true, src: ['src/timer/*.css'],
                    dest: 'build/debug/css', flatten: true},

                    { expand: true, src: ['lib/**/*'], dest: 'build/debug/js/'}
                ]
            }
        },

        clean: {
            debug: ['build/debug']
        },

        'http-server' : {
            'debug': {
                root: 'build/debug',
                port: '8085',
                host: '127.0.0.1',
                cache: 0,
                showDir: true,
                autoIndex: true,
                defaultExt: 'html',
                runInBackground: true

            }

        },

        jade: {
            debug: {
                options: {
                    pretty: true,
                },
                files: [{
                    expand: true,
                    src: 'src/*.jade',
                    dest: 'build/debug',
                    ext: '.html',
                    flatten: true
                }, {
                    expand: true,
                    src: 'src/*/*.jade',
                    dest: 'build/debug/views',
                    ext: '.html',
                    flatten: true
                }]
            }
        },

        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            },
            all: ['src/**/*.js', 'test/**/*.js']
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
                files: ['test/**/*.js', 'src/**/*.js', 'src/**/*.jade'],
                tasks: ['clean:debug', 'jshint:all', 'karma:watch', 'jade:debug', 'copy:debug']
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-karma');
    

    grunt.registerTask('build:debug', 'Resolve dependencies, lint, unit test', [
        'clean:debug', 'bower:install', 'jshint:all', 'karma:watch', 'jade:debug', 
        'copy:debug', 'http-server:debug']);

    grunt.registerTask('dev', 'Debug build, then watch for changes, lint, and unit test',
        ['build:debug', 'watch'])
};