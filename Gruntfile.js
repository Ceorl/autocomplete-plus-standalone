module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffeelint: {
      app: ['lib/*.coffee'],
      options: {
        max_line_length: {
          level: 'ignore'
        },
        line_endings: {
          value: "unix",
          level: "error"
        }
      }
    },
    coffee: {
      compileBare: {
        options: {
          bare: true
        },
        files: [{
          expand: true,         // Enable dynamic expansion.
          cwd: 'lib/',          // Src matches are relative to this path.
          src: ['**/*.coffee'], // Actual pattern(s) to match.
          dest: 'dist/',         // Destination path prefix.
          ext: '.js'            // Dest filepaths will have this extension.
        }]
      }
    },
    watch: {
      files: ['lib/*.js', 'lib/*.coffee', 'lib/*.css', 'lib/*.scss'],
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      tasks: ['build']
    },
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Tasks
  grunt.registerTask('build', ['coffeelint', 'coffee']);
  grunt.registerTask('default', ['build', 'test']);
  grunt.registerTask('default', [ 'concat', 'uglify']);
};
