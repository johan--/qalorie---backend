module.exports = (grunt) ->
  SRC_COMPILED = 'modules/webserver/frontend/compiled/'
  SRC_COFFEE = 'modules/webserver/frontend/coffee/'
  SRC_LESS = 'modules/webserver/frontend/less/'
  SRC_VENDOR = 'modules/webserver/frontend/vendor/'
  SRC_TEMPLATE = 'modules/webserver/frontend/templates/'
  SRC_PUBLIC = 'modules/webserver/public/'

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    mkdir:
      all:
        options:
          mode: 755
          create: ['modules/webserver/public/uploads/u']

    bump:
      options:
        files: ['package.json']
        updateConfigs: []
        commit: true
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'] # '-a' for all files
        createTag: true
        tagName: 'v%VERSION%'
        tagMessage: 'Version %VERSION%'
        push: true
        pushTo: 'origin'
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' # options to use with '$ git describe'


    # CoffeeScript
    coffee:
      app:
        src:  [
          SRC_COFFEE + 'null/namespace.coffee'
          SRC_COFFEE + 'null/config.coffee'
          SRC_COFFEE + 'null/log.coffee'
          SRC_COFFEE + 'null/helper.coffee'
          SRC_COFFEE + 'null/image.coffee'
          SRC_COFFEE + 'null/authorization/**/*.coffee'
          SRC_COFFEE + 'null/models/**/*.coffee'
          SRC_COFFEE + 'null/collections/**/*.coffee'
          SRC_COFFEE + 'null/views/**/*.coffee'
          SRC_COFFEE + 'null/routers/**/*.coffee'
          SRC_COFFEE + 'app/namespace.coffee'
          SRC_COFFEE + 'app/config.coffee'
          SRC_COFFEE + 'app/authorization.coffee'
          SRC_COFFEE + 'app/events/**/*.coffee'
          SRC_COFFEE + 'app/models/**/*.coffee'
          SRC_COFFEE + 'app/collections/**/*.coffee'
          SRC_COFFEE + 'app/views/base.coffee'
          SRC_COFFEE + 'app/views/**/!(base).coffee'
          SRC_COFFEE + 'app/routers/**/*.coffee'
          SRC_COFFEE + 'app/xmpp/**/*.coffee'
          SRC_COFFEE + 'app/templates_helpers/**/*.coffee'
          SRC_COFFEE + 'app/app.coffee'
        ]
        dest: SRC_COMPILED + 'js/app.js'

      login:
        src:  [
          SRC_COFFEE + 'app/namespace.coffee'
          SRC_COFFEE + 'app/config.coffee'
          SRC_COFFEE + 'app/layout.coffee'
          SRC_COFFEE + 'app/login.coffee'
        ]
        dest: SRC_COMPILED + 'js/login.js'

      signup:
        src:  [
          SRC_COFFEE + 'app/namespace.coffee'
          SRC_COFFEE + 'app/config.coffee'
          SRC_COFFEE + 'app/layout.coffee'
          SRC_COFFEE + 'app/signup.coffee'
        ]
        dest: SRC_COMPILED + 'js/signup.js'

      landing:
        src:  [
          SRC_COFFEE + 'app/namespace.coffee'
          SRC_COFFEE + 'app/config.coffee'
          SRC_COFFEE + 'app/layout.coffee'
          SRC_COFFEE + 'app/landing.coffee'
        ]
        dest: SRC_COMPILED + 'js/landing.js'

      landing_free:
        src:  [
          SRC_COFFEE + 'app/namespace.coffee'
          SRC_COFFEE + 'app/config.coffee'
          SRC_COFFEE + 'app/layout.coffee'
          SRC_COFFEE + 'app/landing_free.coffee'
        ]
        dest: SRC_COMPILED + 'js/landing_free.js'

    # Lodash templates
    jst:
      app:
        options:
          processName:  (filename) ->
              filename = filename.replace /frontend\/templates\//gi, ''
              filename.replace /modules\/webserver\//gi, ''
              #filename.replace(/frontend\/templates\//gi, '').replace /\.html/, ''

        src: SRC_TEMPLATE + '**/*.html'
        dest: SRC_COMPILED + 'js/jst.js'

    # LESS preprocessor for CSS
    less:
      options:
        paths: [
          SRC_VENDOR + 'less'
          SRC_LESS
        ]

      app:
        src: [
          # SRC_LESS + 'base.less'
          SRC_LESS + 'app.less'
        ]
        dest: SRC_COMPILED + 'css/app.css'

      login:
        src: [
          SRC_LESS + 'login.less'
        ]
        dest: SRC_COMPILED + 'css/login.css'

      landing:
        src: [
          SRC_LESS + 'landing.less'
        ]
        dest: SRC_COMPILED + 'css/landing.css'

      responsive:
        src: [
          SRC_LESS + 'responsive.less'
        ]
        dest: SRC_COMPILED + 'css/responsive.css'

      nutritionist:
        src: [
          SRC_LESS + 'app_nutritionist.less'
        ]
        dest: SRC_COMPILED + 'css/app_nutritionist.css'
      admin:
        src: [
          SRC_LESS + 'admin.less'
        ]
        dest: SRC_COMPILED + 'css/admin.css'
      test_api:
        src: [
          SRC_LESS + 'base.less'
          SRC_LESS + 'test_api.less'
        ]
        dest: SRC_COMPILED + 'css/test_api.css'

    # Concatenated JS and CSS files
    concat:
      app_js:
        src: [
          SRC_VENDOR + 'js/modernizr.custom.js'
          SRC_VENDOR + 'js/jquery-1.11.1.min.js'
          SRC_VENDOR + 'js/jquery-ui-1.10.4.min.js'
          SRC_VENDOR + 'js/jquery.mmenu.min.js'
          SRC_VENDOR + 'js/jquery.cookies.2.2.0.min.js'
          SRC_VENDOR + "js/jquery-filestyle.min.js"
          SRC_VENDOR + "js/jquery-icheck.min.js"
          SRC_VENDOR + "js/icheck.min.js"
          SRC_VENDOR + "js/jquery.mCustomScrollbar.min.js"
          SRC_VENDOR + "js/jquery.multi-accordion-1.5.3.js"
          SRC_VENDOR + "js/jquery.blockUI.js"
          SRC_VENDOR + "js/jquery.form.js"
          SRC_VENDOR + "js/jquery-selectuislider.js" #http://jsfiddle.net/icc97/3Fwdw/2/
          SRC_VENDOR + "js/spin.min.js"
          SRC_VENDOR + 'js/jquery.flexslider-min.js'
          SRC_VENDOR + "js/jquery.spin.js"
          SRC_VENDOR + "js/mixitup.min.js"
          SRC_VENDOR + 'js/underscore-min.js'
          SRC_VENDOR + 'js/moment-with-locales.js'
          SRC_VENDOR + 'js/bootstrap.min.js'
          SRC_VENDOR + 'js/backbone-min.js'
          SRC_VENDOR + 'js/backbone.iobind.js'
          SRC_VENDOR + 'js/backbone_babysitter.js'
          SRC_VENDOR + 'js/backbone.wreqr.min.js'
          SRC_VENDOR + "js/bootstrap-formhelpers.js"
          SRC_VENDOR + "js/bootstrap-progressbar.min.js"
          SRC_VENDOR + "js/globalize.min.js"
          SRC_VENDOR + "js/async.js"
          SRC_VENDOR + "js/md5.js"
          SRC_VENDOR + "js/jquery-charts.min.js"
          SRC_VENDOR + "js/prettify.min.js"
          SRC_VENDOR + "js/app.js"
          SRC_VENDOR + "js/behaviours.js"
          SRC_VENDOR + "js/jquery.validate.min.js"
          SRC_VENDOR + "js/chart.min.js"
          SRC_VENDOR + "js/jquery.Jcrop.min.js"
          SRC_VENDOR + "js/cropper.min.js"
          SRC_VENDOR + "js/jquery.fancybox.pack.js"
          SRC_COMPILED + 'js/jst.js'
          SRC_VENDOR + "js/notify-custom.js"
          '<%= coffee.app.dest %>'
        ]
        dest: SRC_PUBLIC + 'js/app.js'
      login_js:
        src:[
          SRC_VENDOR + 'js/modernizr.custom.js'
          #SRC_VENDOR + 'js/jquery-1.11.1.min.js'
          #SRC_VENDOR + 'js/jquery-ui-1.10.4.min.js'
          SRC_VENDOR + "js/jquery-icheck.min.js"
          SRC_VENDOR + 'js/jquery.cookies.2.2.0.min.js'
          SRC_VENDOR + 'js/underscore-min.js'
          SRC_VENDOR + 'js/backbone-min.js'
          SRC_VENDOR + 'js/backbone.iobind.js'
          SRC_VENDOR + 'js/backbone_babysitter.js'
          SRC_VENDOR + 'js/backbone.wreqr.min.js'
          SRC_VENDOR + "js/jquery.validate.min.js"
          '<%= coffee.login.dest %>'
        ]
        dest: SRC_PUBLIC + 'js/login.js'

      signup_js:
        src:[
          SRC_VENDOR + 'js/modernizr.custom.js'
          SRC_VENDOR + 'js/jquery-1.11.1.min.js'
          #SRC_VENDOR + 'js/jquery-ui-1.10.4.min.js'
          SRC_VENDOR + "js/jquery-icheck.min.js"
          SRC_VENDOR + 'js/jquery.cookies.2.2.0.min.js'
          SRC_VENDOR + 'js/underscore-min.js'
          SRC_VENDOR + 'js/jquery.flexslider-min.js'
          SRC_VENDOR + 'js/backbone-min.js'
          SRC_VENDOR + 'js/backbone.iobind.js'
          SRC_VENDOR + 'js/backbone_babysitter.js'
          SRC_VENDOR + 'js/backbone.wreqr.min.js'
          SRC_VENDOR + 'js/jquery.validate.min.js'
          SRC_VENDOR + "js/jquery-selectuislider.js"
          '<%= coffee.signup.dest %>'
        ]
        dest: SRC_PUBLIC + 'js/signup.js'

      landing_js:
        src: [
          SRC_VENDOR + 'js/modernizr.custom.js'
          SRC_VENDOR + 'js/jquery-1.11.1.min.js'
          SRC_VENDOR + 'js/jquery.cookies.2.2.0.min.js'
          #SRC_VENDOR + 'js/jquery-ui-1.10.4.min.js'
          SRC_VENDOR + 'js/bootstrap.min.js'
          #SRC_VENDOR + 'js/bootstrap-formhelpers.js'
          '<%= coffee.landing.dest %>'
        ]
        dest: SRC_PUBLIC + 'js/landing.js'

      landing_free_js:
        src: [
          SRC_VENDOR + 'js/modernizr.custom.js'
          SRC_VENDOR + 'js/jquery-1.11.1.min.js'
          SRC_VENDOR + 'js/jquery.cookies.2.2.0.min.js'
          #SRC_VENDOR + 'js/jquery-ui-1.10.4.min.js'
          SRC_VENDOR + 'js/bootstrap.min.js'
          #SRC_VENDOR + 'js/bootstrap-formhelpers.js'
          '<%= coffee.landing_free.dest %>'
        ]
        dest: SRC_PUBLIC + 'js/landing_free.js'

      app_css:
        src: [
          # SRC_VENDOR + 'css/jquery-ui-1.10.4.min.css'
          SRC_VENDOR + 'css/bootstrap.min.css'
          SRC_VENDOR + 'css/bootstrap-formhelpers.min.css'
          # SRC_VENDOR + 'css/bootstrap-responsive.css'
          # SRC_VENDOR + 'css/pages/*.css'
          # '!' + SRC_VENDOR + 'css/pages/login.css'
          # '!' + SRC_VENDOR + 'css/pages/signup.css'
          # '!' + SRC_VENDOR + 'css/pages/landing.css'
          # SRC_VENDOR + 'css/responsive.css'
          # SRC_VENDOR + 'css/style.css'
          SRC_VENDOR + 'css/jquery.Jcrop.css'
          SRC_VENDOR + 'css/cropper.min.css'
          SRC_VENDOR + 'css/jquery.fancybox.css'
          '<%= less.app.dest %>'
        ]
        dest: SRC_PUBLIC + 'css/app.css'

      login_css:
        src: [
          SRC_VENDOR + 'css/bootstrap.min.css'
          SRC_VENDOR + 'css/bootstrap-formhelpers.min.css'
          SRC_VENDOR + 'css/flexslider.css'
          '<%= less.login.dest %>'
        ]
        dest: SRC_PUBLIC + 'css/login.css'

      landing_css:
        src: [
          SRC_VENDOR + 'css/bootstrap.min.css'
          #SRC_VENDOR + 'css/bootstrap-formhelpers.min.css'
          '<%= less.landing.dest %>'
        ]
        dest: SRC_PUBLIC + 'css/landing.css'

      responsive_css:
        src: '<%= less.responsive.dest %>'
        dest: SRC_PUBLIC + 'css/responsive.css'

      test_api_css:
        src: '<%= less.test_api.dest %>'
        dest: SRC_PUBLIC + 'css/test_api.css'

      nutritionist_css:
        src: [
          SRC_VENDOR + 'css/bootstrap.min.css'
          SRC_VENDOR + 'css/bootstrap-formhelpers.min.css'
          '<%= less.nutritionist.dest %>'
        ]
        dest: SRC_PUBLIC + 'css/app_nutritionist.css'

      admin_css:
        src: [
          SRC_VENDOR + 'css/bootstrap.min.css'
          SRC_VENDOR + 'css/bootstrap-formhelpers.min.css'
          SRC_VENDOR + 'css/jquery.fancybox.css'
          '<%= less.admin.dest %>'
        ]
        dest: SRC_PUBLIC + 'css/admin.css'

    copy:
      main:
        files: [
          {
            expand: true
            cwd: SRC_VENDOR + 'images/'
            src: ['**']
            dest: SRC_PUBLIC + "images/"
          }
          {
            expand: true
            cwd: SRC_VENDOR + 'img/'
            src: ['**']
            dest: SRC_PUBLIC + "img/"
          }
          {
            expand: true
            cwd: SRC_VENDOR + 'css/'
            src: 'Jcrop.gif'
            dest: SRC_PUBLIC + "css/"
          }
          {
            expand: true
            cwd: SRC_VENDOR + 'fonts/'
            src: ['**']
            dest: SRC_PUBLIC + "fonts/"
          }
          {
            expand: true
            cwd: SRC_VENDOR + 'ico/'
            src: ['**']
            dest: SRC_PUBLIC + "ico/"
          }
          {
            expand: true
            cwd: SRC_VENDOR + "../"
            src: ['favicon.ico']
            dest: SRC_PUBLIC
          }
        ]


    # Watch for changes of files
    watch:
      gruntfile:
        files: 'Gruntfile.coffee'
        tasks: ['default']
        options:
          nocase: true

      app_js:
        files: [
          '<%= coffee.app.src %>'
          '<%= jst.app.src %>'
          SRC_VENDOR + 'js/**/*.js'
        ]
        tasks: [
          'coffee:app'
          'jst:app'
          'concat:app_js'
        ]

      app_css:
        files: [
          SRC_LESS + '*.less'
          SRC_VENDOR + 'css/**/*.css'
          SRC_VENDOR + 'less/**/*.less'
        ]
        tasks: [
          'less:app'
          'concat:app_css'
        ]

      images:
        files: [
          SRC_VENDOR + 'img/**'
          SRC_VENDOR + 'images/**'
          SRC_VENDOR + 'ico/**'
          SRC_VENDOR + 'fonts/**'
        ]
        tasks: [
          'copy:main'
        ]

      login_js:
        files: [
          '<%= coffee.login.src %>'
        ]
        tasks: [
          'coffee:login'
          'concat:login_js'
        ]

      signup_js:
        files: [
          '<%= coffee.signup.src %>'
        ]
        tasks: [
          'coffee:signup'
          'concat:signup_js'
        ]

      landing_js:
        files: [
          '<%= coffee.landing.src %>'
        ]
        tasks: [
          'coffee:landing'
          'concat:landing_js'
        ]

      landing_free_js:
        files: [
          '<%= coffee.landing_free.src %>'
        ]
        tasks: [
          'coffee:landing_free'
          'concat:landing_free_js'
        ]

      login_css:
        files: [
          '<%= less.login.src %>'
          SRC_VENDOR + 'css/**/*.css'
          SRC_VENDOR + 'less/**/*.less'
        ]
        tasks: [
          'less:login'
          'concat:login_css'
        ]

      landing_css:
        files: [
          '<%= less.landing.src %>'
          SRC_VENDOR + 'css/**/*.css'
          SRC_VENDOR + 'less/**/*.less'
        ]
        tasks: [
          'less:landing'
          'concat:landing_css'
        ]

      responsive_css:
        files: [
          '<%= less.responsive.src %>'
          SRC_VENDOR + 'css/**/*.css'
          SRC_VENDOR + 'less/**/*.less'
        ]
        tasks: [
          'less:responsive'
          'concat:responsive_css'
        ]

      nutritionist_css:
        files: [
          '<%= less.nutritionist.src %>'
        ]
        tasks: [
          'less:nutritionist'
          'concat:nutritionist_css'
        ]

      admin_css:
        files: [
          '<%= less.admin.src %>'
        ]
        tasks: [
          'less:admin'
          'concat:admin_css'
        ]

      test_api_css:
        files: [
          '<%= less.test_api.src %>'
          SRC_VENDOR + 'css/**/*.css'
          SRC_VENDOR + 'less/**/*.less'
        ]
        tasks: [
          'less:test_api'
          'concat:test_api_css'
        ]

      scripts:
        files: [
          SRC_COFFEE + 'system/**/*.coffee'
          SRC_VENDOR + 'js/**/*.js'
        ]
        tasks: [
          'coffee'
          'jst:app'
          'concat:app_js'
          'concat:login_js'
          'concat:landing_js'
          'concat:landing_free_js'
          'concat:signup_js'
        ]

      styles:
        files: [
          SRC_LESS + 'base.less'
          SRC_VENDOR + 'css/**/*.css'
          SRC_VENDOR + 'less/**/*.less'
        ]
        tasks: [
          'less'
          'concat:app_css'
          'concat:login_css'
          'concat:landing_css'
          'concat:responsive_css'
          'concat:test_api_css'
        ]

    # Uglify, compress js files
    uglify:
      options:
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
      app:
        src: '<%= concat.app_js.dest %>'
        dest: SRC_PUBLIC + 'js/app.min.js'
      login:
        src: '<%= concat.login_js.dest %>'
        dest: SRC_PUBLIC + 'js/login.min.js'
      signup:
        src: '<%= concat.signup_js.dest %>'
        dest: SRC_PUBLIC + 'js/signup.min.js'
      landing:
        src: '<%= concat.landing_js.dest %>'
        dest: SRC_PUBLIC + 'js/landing.min.js'
      landing_free:
        src: '<%= concat.landing_free_js.dest %>'
        dest: SRC_PUBLIC + 'js/landing_free.min.js'

    # CSSMIN, compress css files
    cssmin:
      options:
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
      app:
        src: '<%= concat.app_css.dest %>'
        dest: SRC_PUBLIC + 'css/app.min.css'
      login:
        src: '<%= concat.login_css.dest %>'
        dest: SRC_PUBLIC + 'css/login.min.css'
      landing:
        src: '<%= concat.landing_css.dest %>'
        dest: SRC_PUBLIC + 'css/landing.min.css'
      responsive:
        src: '<%= concat.responsive_css.dest %>'
        dest: SRC_PUBLIC + 'css/responsive.min.css'
      nutritionist_css:
        src: '<%= concat.nutritionist_css.dest %>'
        dest: SRC_PUBLIC + 'css/app_nutritionist.min.css'

  # Listen for events when files are modified
  grunt.event.on 'watch', (action, filepath) ->
    grunt.log.writeln filepath + ' has ' + action

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jst'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-less'

  grunt.loadNpmTasks 'grunt-mocha-cli'
  grunt.loadNpmTasks 'grunt-exec'

  grunt.loadNpmTasks 'grunt-bump'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-mkdir'
  grunt.loadNpmTasks 'grunt-mkdir'

  grunt.registerTask 'default', ['coffee', 'jst', 'less', 'concat', 'copy', 'mkdir']
  grunt.registerTask 'production', ['coffee', 'jst', 'less', 'concat', "cssmin", 'uglify']

  grunt.registerTask 'test', ['exec:test']
  grunt.registerTask 'test-cov-json', ['exec:test_cov_json', 'exec:test_parse_cov_json']
  grunt.registerTask 'test-cov-html', ['exec:test_cov_html', 'exec:test_parse_cov_html']

  grunt.registerTask 'mocha-test', ['mochacli:test']
  grunt.registerTask 'mocha-test-cov-json', ['mochacli:test_cov_json']
  grunt.registerTask 'mocha-test-cov-html', ['mochacli:test_cov_html']
