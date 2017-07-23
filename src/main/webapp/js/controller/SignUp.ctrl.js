(() => {
    'use strict';

    angular.module('authModule').controller('SignUpController', ['$state', 'AuthService', 'ModalService', 'ToastService', 'APP_STATES', function ($state, AuthService, ModalService, ToastService, APP_STATES) {
        this.user = {};

        this.submit = function () {
            return AuthService.signUp(this.user)
                .catch(err => ModalService.notifyError(`Could not register. ${(err.data.message || '')}`, err))
                .then(info => {
                    ToastService.showActionToast('You are correctly registered and can login now!');
                    $state.go(APP_STATES.HOME.name);
                    return info;
                });
        };
    }]);
})();
