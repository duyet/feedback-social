define(function(require) {
    /**
     * Instantiate the application
     */
    window.getFeedbackAppInstance = function(forceNew) {
    	var forceNew = forceNew || false;

    	if (!forceNew && window.__App) return window.__App;

		var App = require('App');
    	window.__App = new App();

    	return window.__App;
    };

    // Helper 
    window.console.i = function(message) {
    	console.info((new Date()).toString() + ' :: ' + message);
    }

    return window.getFeedbackAppInstance();
});
