define(function(require) {
    /**
     * Instantiate the application
     */
    var App = require('App');
    window.__App = new App();
    return window.__App;
});
