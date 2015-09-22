/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    watch: {
      react: {
        files: 'scripts/*.jsx',
        tasks: ['clean','react','uglify']
      },
      sass: {
        files: 'styles/*.scss',
        tasks: ['sass']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    },
    clean: ['scripts/application.min.js'],
    react: {
      files: {
        expand: true,
        src: ['scripts/*.jsx'],
        dest: './',
        ext: '.js'
      }
    },
    // concat: {
    //   dist: {
    //     src: ['scripts/*.js'],
    //     dest: 'scripts/application.js'
    //   }
    // },
    uglify: {
      dist: {
        src: 'scripts/*.js',
        dest: 'scripts/application.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['script/**/*.js', 'test/**/*.js']
      }
    },
    wiredep: {
      task: {
        src: [
          'views/layout.erb',
          'styles/styles.scss'
        ]
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          extDot: 'last',
          src: ['styles/styles.scss'],
          ext: '.css'
        }],
        verbose: true,
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // Default task.
  grunt.registerTask('default', ['watch']);

};
