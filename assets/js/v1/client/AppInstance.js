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
    };

    // Offline detect
	window.addEventListener('load', function() {
		var offlineFlash = document.getElementById("feedback-flash-error");
		var onlineFlash = document.getElementById("feedback-flash-success");

		function updateOnlineStatus(event) {
			offlineFlash.style.display = "none";
			onlineFlash.style.display = "none";

			var condition = navigator.onLine ? "online" : "offline";
			
			if (condition == "offline") {
				offlineFlash.innerHTML = "Đã ngắt kết nối. Đang thử lại ...";
				offlineFlash.style.display = "block";
			} else {
				onlineFlash.innerHTML = "Đã kết nối. Click để ẩn thông báo";
				onlineFlash.style.display = "block";
			}
		}

		window.addEventListener('online',  updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);
	});

    return window.getFeedbackAppInstance();
});
