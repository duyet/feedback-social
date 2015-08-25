require.config({
    paths: {
        jquery: [
            '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min', 
            '../../../lib/jquery/dist/jquery.min'
        ],
        underscore: [
            '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min', 
            '../../../lib/underscore/underscore-min'
        ],
        backbone: [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.2/backbone-min', 
            '../../../lib/backbone/backbone-min'
        ],
        marionette: [
            '//cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.4.2/backbone.marionette.min', 
            '../../../lib/backbone.marionette/lib/backbone.marionette.min'
        ],
        bootstrap: [
            '../../../lib/bootstrap/js',
        ],
        cookie: [
            '//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min',
            '../../../lib/jquery.cookie/jquery.cookie',
        ],
        marked: [
            '//cdnjs.cloudflare.com/ajax/libs/marked/0.3.2/marked.min',
            '../../../lib/marked/marked.min',
        ],
        moment: [
            '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.min',
            '../../../lib/moment/min/moment.min',
        ],
        moment_vi: [
            '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/locale/vi',
            '../../../lib/moment/locale/vi',
        ],
    },

    shim: {
        jquery: {
            exports: '$',
        },

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        marionette: {
            deps: ['jquery', 'underscore', 'backbone'],
            exports: 'Marionette'
        },

        'bootstrap/modal': {
            deps: ['jquery'], 
            exports: '$.fn.modal'
        },

        cookie: {
            deps: ['jquery'],
            exports: '$.cookie'
        },
        
        marked: {
            exports: 'marked',  
        },

        moment_vi: {
            exports: 'moment_vi',
        },

        moment: {
            exports: 'moment',
        },
    },

    baseURL: '/js/v1/backbone'
});

require.onError = function(e) {
    console.error(e);
    
    var errorFlash = document.getElementById("feedback-flash-error");
    errorFlash.innerHTML = ("Some things went wrong, please reload this page.");
    errorFlash.style.display = "block";
}

require(
    ['AppInstance'],
    
    function(app) {
        app.start();
    }
);
