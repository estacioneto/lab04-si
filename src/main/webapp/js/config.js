(() => {
    'use strict';

    const app = angular.module('siApp',
        [
            'app',
            'ui.router',
            'ui.bootstrap',
            'ngAria',
            'ngMaterial',
            'ngMessages',
            'angular-storage',
            'toolbarModule',
            'toastModule',
            'modalModule',
            'homeModule',
            'searchModule',
            'seriesModule',
            'userModule',
            'authModule'
        ]);
    app.constant('_', window._)
    /**
     * Loading panel config
     */
        .config(['$urlRouterProvider', '$provide', '$httpProvider',
            ($urlRouterProvider, $provide, $httpProvider) => {

                /**
                 * Adds watchers for requests open and close. While there's an
                 * open request the loading indicator keeps shown.
                 */
                function loadingInterceptor($rootScope, $q) {
                    let _openRequests_ = 0;

                    return {
                        request: config => {
                            _openRequests_++;
                            $rootScope.$broadcast('loading_show');
                            return config || $q.when(config);
                        },
                        response: response => {
                            if (!(--_openRequests_)) {
                                $rootScope.$broadcast('loading_hide');
                            }
                            return response || $q.when(response);
                        },
                        responseError: response => {
                            if (!(--_openRequests_)) {
                                $rootScope.$broadcast('loading_hide');
                            }
                            return $q.reject(response);
                        }
                    };
                }

                $provide.factory('loadingInterceptor', ['$rootScope', '$q', loadingInterceptor]);

                $urlRouterProvider.otherwise('/app/');

                $httpProvider.interceptors.push('loadingInterceptor');
            }])
        /**
         * State config
         */
        .config(['$stateProvider', '$locationProvider', ($stateProvider, $locationProvider) => {
            const view = './view/';
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: view + 'app.html',
                    controller: 'AppController'
                })
                .state('app.init', {
                    url: '/',
                    templateUrl: view + 'initial.html',
                    controller: 'InitialController as initialCtrl'
                })
                .state('app.signup', {
                    url: '/signup',
                    templateUrl: view + 'sign-up.html',
                    controller: 'SignUpController as signUpCtrl'
                })
                .state('app.login', {
                    url: '/login',
                    templateUrl: view + 'login.html',
                    controller: 'LoginController as loginCtrl'
                })
                .state('app.home', {
                    url: '/home',
                    templateUrl: view + 'home.html',
                    controller: 'HomeController as homeCtrl'
                })
                .state('app.profile', {
                    url: '/profile',
                    templateUrl: view + 'profile.html',
                    controller: 'ProfileController as profileCtrl'
                })
                .state('app.watchlist', {
                    url: '/watchlist',
                    templateUrl: view + 'watchlist.html',
                    controller: 'WatchlistController as watchlistCtrl'
                });
            $locationProvider.html5Mode(true);
        }])
        .config(['$mdThemingProvider', $mdThemingProvider => {
            $mdThemingProvider.setNonce();
            $mdThemingProvider.theme('default')
                .primaryPalette('grey', {default: 'A200'})
                .accentPalette('red', {default: '600'})
                .warnPalette('red', {default: '600'});
        }]);
    app.run(['$rootScope', 'ModalService', ($rootScope, ModalService) => {
        $rootScope._ = window._;
        $rootScope.apiRoot = '/api';

        $rootScope.appPrimaryColor = 'grey';
        $rootScope.appSecondaryColor = 'gery';

        let _modalResp_ = null;
        $rootScope.$on('loading_show', () => {
            if (!_modalResp_) {
                _modalResp_ = ModalService.loadingIndicatorModal();
                _modalResp_.open();
            } else {
                _modalResp_.show();
            }
        });

        $rootScope.$on('loading_hide', () => {
            if (_modalResp_) {
                _modalResp_.hide();
            }
        });
    }]);
})();
