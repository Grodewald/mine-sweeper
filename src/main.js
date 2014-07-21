/*global require, window */

require.config({
    paths: {
        angular: 'lib/angular/angular'
    },
    shim: {
        'angular' : {'exports' : 'angular'}

    },
    priority: [
        'angular'
    ]

});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP";

/*jshint ignore:start */
require( [
    'angular',
    'app'
    ], function(angular, app) {
        'use strict';
        
        angular.element(document).ready(function() {
            app.init();
        });
    }
);
/*jshint ignore:end */

