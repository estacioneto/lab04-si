(() => {
    'use strict';

    angular.module('authModule').controller('LoginController', ['$state', 'AuthService', 'ModalService', 'ToastService', 'APP_STATES', function ($state, AuthService, ModalService, ToastService, APP_STATES) {
        this.user = {};

        this.submit = function () {
            return AuthService.login(this.user)
                .catch(err => ModalService.notifyError(`Could not login. ${(err.data.message || '')}`, err))
                .then(info => {
                    ToastService.showActionToast('Login completed! You can use the application!');
                    $state.go(APP_STATES.HOME.name);
                    return info;
                });
        };
    }]);
})();
