(() => {
    'use strict';

    angular.module('authModule').controller('InitialController', ['$state', 'AuthService', 'APP_STATES', function ($state, AuthService, APP_STATES) {
        (() => {
            if (AuthService.isAuthenticated())
                $state.go(APP_STATES.HOME.name);
        })();
    }]);
})();
