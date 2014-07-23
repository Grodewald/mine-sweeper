/*jshint ignore:start*/ 
define(['angular', 'controllers'], function(angular) {
    var app = angular.module('mineSweeper',['mineSweeper.controllers']);
    app.init = function () {
        angular.bootstrap(document, ['mineSweeper']);
    }

    app.directive('ngRightClick', function($parse) {
        return function(scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function(event) {
                scope.$apply(function() {
                    event.preventDefault();
                    fn(scope, {$event:event});
                });
            });
        };
    });
    
    return app;

});
/*jshint ignore:end*/ 