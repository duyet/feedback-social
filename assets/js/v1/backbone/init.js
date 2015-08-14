/**
 * Main backbone frontend controller 
 *  -> Init
 *
 * @author: Van-Duyet Le (duyetdev)
 * @date: 14/08/2015
 */

// Default render
var homeView = new HomeView({ el: $("#main-view") });
var footerView = new FooterView({ el: $("footer") });

// Init router 
var router = new AppRouter();