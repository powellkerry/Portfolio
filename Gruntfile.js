module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: false,
        mangle: false
      },
      dist: {
        files: {
          'scripts/build/portfolio.min.js': 
            [
              'scripts/Portfolio.js',
              'scripts/controllers/**/*.js',
              'scripts/directives/**/*.js',
              'scripts/factories/**/*.js'
            ] 
        }
      }
    },

    sass: {
      options: {
        style: 'compressed'
      },
      dist: {
        files: [{
          src: ['styles/portfolio.scss'],
          dest: 'styles/build/portfolio.min.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['portfolio:js']
      },
      css: {
        files: ['styles/**/*.scss'],
        tasks: ['portfolio:sass']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass']);
  grunt.registerTask('portfolio:sass', ['sass']);
  grunt.registerTask('portfolio:js', ['uglify']);
  grunt.registerTask('portfolio:watch', ['uglify', 'sass', 'watch']);

};