/**
 * Created by ablir on 9/19/2016.
 * Helper class for tooltip and balloon
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = function (root, angular) {
            if (angular === undefined) {
                if (typeof window !== 'undefined') {
                    angular = require('angular');

                } else {
                    angular = require('angular')(root);
                }
            }
            factory(angular);
            return angular;
        };
    } else {
        factory(angular);
    }
}(function (angular) {

    var PositionController = function (element, attrs, timeout, window)
    {
        timeout(function() {
            var sourceElement = document.querySelector('[aria-describedby*="' + element.attr('id') + '"');
            if(sourceElement===null)
            {
                return;
            }
            var location = attrs.wfPosition==="undefined"?"top":attrs.wfPosition;
            addPosition(location, sourceElement.getBoundingClientRect());
        },0);


        var addPosition = function(userChoice, sourceBoundaries) {
            var a = 0,b = 0;
            if (userChoice === "top")
            {
                a = isNaN(sourceBoundaries.top)  ? 0 : (sourceBoundaries.top + window.pageYOffset - angular.element(element)[0].getBoundingClientRect().height - 10);
                b = isNaN(sourceBoundaries.left)  ? 0 : (sourceBoundaries.left + sourceBoundaries.width / 2 + window.pageXOffset  - angular.element(element)[0].getBoundingClientRect().width / 2);
            }
            else if (userChoice === "bottom")
            {
                a = isNaN(sourceBoundaries.bottom)  ? 0 : (sourceBoundaries.bottom + window.pageYOffset  - angular.element(element)[0].getBoundingClientRect().height + 10);
                b =  isNaN(sourceBoundaries.left)  ? 0 : (sourceBoundaries.left + sourceBoundaries.width / 2 + window.pageXOffset  - angular.element(element)[0].getBoundingClientRect().width / 2) ;

            }
            else if (userChoice === "left")
            {
                a = isNaN(sourceBoundaries.top)  ? 0 : (sourceBoundaries.top + window.pageYOffset  - angular.element(element)[0].getBoundingClientRect().height / 2 - 10);
                b =  isNaN(sourceBoundaries.left)  ? 0 : (sourceBoundaries.left + window.pageXOffset - angular.element(element)[0].getBoundingClientRect().width );
            }else if (userChoice === "right")
            {
                a = isNaN(sourceBoundaries.top)  ? 0 : (sourceBoundaries.top + window.pageYOffset  - angular.element(element)[0].getBoundingClientRect().height / 2 - 10);
                b =  isNaN(sourceBoundaries.right)  ? 0 : (sourceBoundaries.right + window.pageXOffset );
            }
            element.css('top',(a + 'px'));
            element.css('left',(b + 'px'));
            angular.element(element).addClass("in");

        };
    };

    PositionController.$inject = ['$element','$attrs','$timeout','$window'];

    angular.module('wf.angular.position',[])
        .directive('wfPosition',  function() {
            return {
                restrict: 'A',
                transclude: false,
                controller: PositionController
            };
        });
}));