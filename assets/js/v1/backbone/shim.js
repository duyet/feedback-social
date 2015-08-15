require.config({
    paths: {
        jquery: '../../../lib/jquery/dist/jquery.min',
        underscore: '../../../lib/underscore/underscore-min',
        backbone: '../../../lib/backbone/backbone-min',
        marionette: '../../../lib/backbone.marionette/lib/backbone.marionette.min'
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
        }
    },

    baseURL: '/js/v1/backbone'
});


require(
    ['AppInstance'],
    
    function(app) {
        app.start();
    }
);
