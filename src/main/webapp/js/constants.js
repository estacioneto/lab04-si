(() => {
    'use strict';
    const apiRoot = '/api';
    angular.module('siApp')
        .constant('API_URIS', {
            USERS: apiRoot + '/users',
            SIGNUP: apiRoot + '/users',
            LOGIN: apiRoot + '/users/login',
            SERIES: apiRoot + '/series',
            PROFILE_SERIES: apiRoot + '/series/profile',
            WATCHLIST_SERIES: apiRoot + '/series/watchlist'
        })
        .constant('APP_STATES', {
            PROFILE: {
                name: 'app.profile',
                icon: 'person'
            }, WATCHLIST: {
                name: 'app.watchlist',
                icon: 'tv'
            }, HOME: {
                name: 'app.home',
                icon: 'home'
            }, LOGIN: {
                name: 'app.login',
                icon: 'person_add'
            }, SIGNUP: {
                name: 'app.signup',
                icon: 'person_add'
            }, INIT: {
                name: 'app.init'
            }
        });
})();
