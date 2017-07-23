(() => {
    'use strict';

    angular.module('authModule', []).service('AuthService', ['$q', '$http', '$state', 'store', 'APP_STATES', 'API_URIS', function ($q, $http, $state, store, APP_STATES, API_URIS) {

        this.user = undefined;

        this.signUp = function (user) {
            const sentUser = angular.copy(user);
            sentUser.password = md5(sentUser.password);
            return $http.post(API_URIS.SIGNUP, sentUser);
        };

        this.isAuthenticated = () => !!(store.get('token'));

        this.logout = function () {
            this.user = undefined;
            store.remove('token');
            $state.go(APP_STATES.INIT.name);
        };

        this.login = function (user) {
            const sentUser = angular.copy(user);
            sentUser.password = md5(sentUser.password);
            return $http.post(API_URIS.LOGIN, sentUser)
                .then(info => {
                    store.set('token', info.data.token);
                    return this.getLoggedUser();
                })
        };

        this.getLoggedUser = function () {
            if (this.user) {
                return $q.when(this.user);
            }
            return $http.get(API_URIS.USERS)
                .then(info => {
                    this.user = info.data;
                    return info.data;
                });
        };

        (() => this.getLoggedUser())();

    }]);
})();
