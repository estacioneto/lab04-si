(() => {
    'use strict';

    /**
     * Search directive. It is an encapsulation for the search form.
     *
     * @param {Function} onSearch Function executed when the search form is submitted.
     *
     * @author Estácio Pereira.
     */
    angular.module('searchModule', []).directive('search', [function () {
        return {
            restrict: 'AE',
            templateUrl: './view/directive/search.html',
            scope: {
                onSearch: '='
            },
            link: function ($scope, element, attrs) {
            }
        };
    }]);
})();
