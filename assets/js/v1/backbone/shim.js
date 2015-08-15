require.config({
    paths: {
        jquery: '../../../lib/jquery/dist/jquery.min',
        underscore: '../../../lib/underscore/underscore-min',
        backbone: '../../../lib/backbone/backbone-min',
        marionette: '../../../lib/backbone.marionette/lib/backbone.marionette.min',
        bootstrap: '../../../lib/bootstrap/js',
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
    },

    baseURL: '/js/v1/backbone'
});


require(
    ['AppInstance'],
    
    function(app) {
        app.start();
    }
);
