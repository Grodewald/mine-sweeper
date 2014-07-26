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

                    { expand: true, src: ['src/*.css'], 
                    dest: 'build/debug/css', flatten: true },

                    { expand: true, src: ['src/mine_sweeper_board/*.js'],
                    dest: 'build/debug/js/mine_sweeper_board', flatten: true},

                    { expand: true, src: ['src/mine_sweeper_game/*.js'],
                    dest: 'build/debug/js/mine_sweeper_game', flatten: true},

                    { expand: true, src: ['src/timer/*.js'],
                    dest: 'build/debug/js/timer', flatten: true},

                    { expand: true, src: ['lib/**/*'], dest: 'build/debug/js/'}
                ]
            }
        },

        clean: {
            debug: ['build/debug'],
            'debug-js': ['build/debug/js/**/*.js'],
            release: ['build/release'],
            dep: ['bower_components', 'lib', 'node_modules']
        },

        connect: {
            options: {
                port: 8085,
                hostname: 'localhost',
                base: 'build/debug',
                livereload: 35729
            },
            livereload: {
                open: true,
                middleware: function (connect) {
                    return [
                        connect.static('build/debug')
                    ];
                }
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

        less: {
            debug: {
                files: [{
                    expand: true,
                    src: 'src/**/*.less',
                    dest: 'build/debug/css',
                    ext: '.css',
                    flatten: true
                }]
            }
        },

        watch: {
            scripts: {
                files: ['test/**/*.js', 'src/**/*.js'],
                tasks: ['clean:debug-js', 'jshint:all', 'karma:watch', 'jade:debug', 'less:debug', 'copy:debug']
            }, 
            jade: {
                files: ['src/**/*.jade'],
                tasks: ['jade:debug']
            },
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:debug']
            },
            css: {
                files: ['src/**/*.css'],
                tasks: ['copy:debug']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'build/debug/**/*.html',
                    'build/debug/css/*.css'
                ] 
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    

    grunt.registerTask('build:debug', 'Resolve dependencies, lint, unit test', [
        'clean:debug', 'bower:install', 'jshint:all', 'karma:watch', 'jade:debug', 
        'less:debug', 'copy:debug', 'connect:livereload']);

    grunt.registerTask('dev', 'Debug build, then watch for changes, lint, and unit test',
        ['build:debug', 'watch']);
};