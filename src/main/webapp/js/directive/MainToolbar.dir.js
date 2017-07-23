(() => {
    'use strict';

    /**
     * Toolbar directive. Initially, is dealing with states and redirecting.
     *
     * @author Estácio Pereira
     */
    angular.module('toolbarModule', []).directive('mainToolbar', ['$state', 'AuthService', 'APP_STATES', function ($state, AuthService, APP_STATES) {
        return {
            restrict: 'AE',
            templateUrl: './view/directive/mainToolbar.html',
            scope: {},
            link: function ($scope, element, attrs) {

                /**
                 * The object containing the available states given the current as key.
                 *
                 * @type {{[state]: [{[name]: [string], [icon]: [string]}]}}
                 */
                $scope.availableStates = {
                    'app.home': [APP_STATES.PROFILE, APP_STATES.WATCHLIST],
                    'app.profile': [APP_STATES.HOME, APP_STATES.WATCHLIST],
                    'app.watchlist': [APP_STATES.HOME, APP_STATES.PROFILE],
                    'app.signup': [APP_STATES.HOME]
                };

                $scope.isAuthenticated = () => AuthService.isAuthenticated();
                $scope.logout = () => AuthService.logout();

                /**
                 * Returns the state name to display.
                 *
                 * @param {string} name Displayable state name.
                 */
                $scope.getStateName = function (name) {
                    return name.replace(/APP\./, '').replace(/\./g, ' ');
                };

                /**
                 * Returns the available states by accessing the current one.
                 *
                 * @returns {Array} List of the available states.
                 */
                $scope.getAvailableStates = function () {
                    const currentState = $state.current.name;
                    return $scope.availableStates[currentState];
                };
            }
        };
    }]);
})();
