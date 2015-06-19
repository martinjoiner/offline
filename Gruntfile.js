module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      mincss: {
        src: ['public_html/css/style.min.css']
      },
      revcss: {
        src: ['public_html/css/*style.min.css']
      },
      revjs: {
        src: ['public_html/js/*offline.min.js']
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      all: ['Gruntfile.js','public_html/js/offline.js']
    }, 
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'public_html/js/offline.js',
        dest: 'public_html/js/offline.min.js'
      }
    },
    cssmin: {
      css: {
        files: {
          'public_html/css/style.min.css' : 
          [ 'public_html/css/style.css' ]
        }
      }
    },
    rev: {
      css: {
        files: {
          src: ['public_html/css/style.min.css']
        }
      },
      js: {
        files: {
          src: ['public_html/js/offline.min.js']
        }
      }
    },
    injector: {
      options: { "ignorePath": ['public_html'] },
      css: {
        files: {
          'public_html/index.html': ['public_html/css/*style.min.css'],
        }
      },
      js: {
        files: {
          'public_html/index.html': ['public_html/js/*offline.min.js'],
        }
      }
    },
    appcache: {
      options: {
        basePath: 'public_html'
      },
      all: {
        dest: 'public_html/manifest.appcache',
        cache: {
          patterns: [
            'public_html/js/*',
            '!public_html/js/offline.js',
            'public_html/css/*',
            '!public_html/css/style.css'
          ],
          literals: [
            'index.html',
            'favicon.ico',
            'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js'
          ]
        },
        network: [
          'GET/latest/index.php',
          '*',
          ''
        ]
        
      }
    },
    watch: {
      css: {
        files: ['public_html/css/style.css'],
        tasks: ['css']
      },
      js: {
        files: ['public_html/js/offline.js'],
        tasks: ['js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-appcache');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('css', ['clean:mincss', 'clean:revcss', 'cssmin', 'rev:css', 'injector:css', 'appcache']);
  grunt.registerTask('js', ['clean:revjs', 'jshint', 'uglify', 'rev:js', 'injector:js', 'appcache']);

};

