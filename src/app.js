/*jshint ignore:start*/ 
define(['angular', 'controllers'], function(angular) {
    var app = angular.module('mineSweeper',['mineSweeper.controllers']);
    app.init = function () {
        angular.bootstrap(document, ['mineSweeper']);
    }
    return app;

});
/*jshint ignore:end*/ 