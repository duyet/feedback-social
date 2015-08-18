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

    baseURL: '/js/v1/admin'
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
