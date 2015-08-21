define(function(require) {
    /**
     * This will be the generic router, used primarily to 
     * choose the proper module
     */
    var Marionette = require('marionette');
    var AppInstance;

    return Marionette.AppRouter.extend({

        /**
         * @property    {Object}    appRoutes   Note that the module routes are not
         *                                      included. Marionette will handle building
         *                                      the global route table
         */
        appRoutes: {
            ''                   : 'homePage',
            '!/'                 : 'homePage',
            '!/explore'          : 'exploreMain',
            '!/explore/:cat'     : 'exploreCat',

            '!/login'            : 'loginForm',
            '!/register'         : 'registerForm',
            '!/forgot'           : 'forgot',
            '!/active/:key'      : 'activeAccount',
            
            '!/user/:username'   : 'userPage',

            '!/new'              : 'newFeedback',

            '!/post/:alias/'     : 'viewPost',            
            '!/post/:alias'      : 'viewPost',

            '!/f/:alias/'        : 'viewFeedback',            
            '!/f/:alias'         : 'viewFeedback', 

            '!/p'                : 'pageList',
            '!/p/:page'          : 'viewPage',  

            '!/contact'          : 'viewContact',      

            // the *path is a special formulation that will match any string
            '*path': 'notFound'

        },

        onRoute: function() {
            
        }

    });
});
