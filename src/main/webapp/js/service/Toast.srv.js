(function () {
    'use strict';

    /**
     * Toast Service. Deals with the Toasts shown on the app.
     *
     * @author Estácio Pereira.
     */
    angular.module('toastModule', []).service('ToastService', ['$q', '$mdToast', function ($q, $mdToast) {
        const self = this,
            FOUR_SECONDS = 4000,
            THREE_SECONDS = 3000;

        this.notifySuccess = function (message, info) {
            this.showActionToast(message);
            return $q.when(info);
        };

        /**
         * Shows an action toast and return the toast promise.
         *
         * @param   {Object | String}  options Object containing all the custom options.
         * @returns {Promise} Toast's promise
         */
        this.showActionToast = function (options) {
            if (!_.isObject(options)) {
                options = {
                    textContent: options,
                    action: 'OK',
                    position: 'bottom left',
                    hideDelay: THREE_SECONDS
                };
            }
            const toast = $mdToast.simple()
                .textContent(options.textContent)
                .action(options.action || 'DONE')
                .highlightAction(options.highlightAction || true)
                .hideDelay(options.hideDelay || false)
                .position(options.position || 'top right');
            return $mdToast.show(toast);
        };

        /**
         * Shows an 'UNDO' toast.
         *
         * @param   {Object}  options Object containing all the custom options.
         * @returns {Promise} Toast's promise
         */
        this.showUndoToast = function (options) {
            options.action = options.action || 'UNDO';
            options.hideDelay = options.hideDelay || FOUR_SECONDS;
            return self.showActionToast(options);
        };
    }]);
})();
