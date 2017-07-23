(function () {
    'use strict';

    /**
     * Modal Service. It encapsulates the operations with the panel and dialog services.
     *
     * @author Estácio Pereira.
     */
    angular.module('modalModule', []).service('ModalService', ['$q', '$mdDialog', '$mdPanel', function ($q, $mdDialog, $mdPanel) {

        const self = this;

        /**
         * Notifies the user about some error.
         *
         * @param   {string} message Message displayed.
         * @param   {*}      err     Error from promise.
         * @returns {Promise} Rejected promise to enable chaining promises.
         */
        this.notifyError = function (message, err) {
            this.error(message);
            return $q.reject(err);
        };

        /**
         * Opens an Error modal.
         *
         * @param  {string}  message Error message.
         * @param  {string}  title   Dialog's title.
         * @return {Promise} Promise, which evaluates to fulfilled when closed.
         */
        this.error = function (message, title) {
            title = title || "Error";
            return $mdDialog.show({
                templateUrl: './view/simpleModal.html',
                controller: 'ModalCtrl',
                clickOutsideToClose: false,
                escapeToClose: false,
                attachTo: angular.element(document.body),
                resolve: {
                    message: function () {
                        return message;
                    },
                    title: function () {
                        return title;
                    }
                }
            });
        };

        /**
         * Creates the loading indicator modal.
         *
         * @returns {MdPanelRef} Panel to be shown
         */
        this.loadingIndicatorModal = function () {
            return $mdPanel.create({
                template: '<div layout="row" layout-sm="column" layout-align="space-around" style="z-index: 10;"><md-progress-circular md-mode="indeterminate"></md-progress-circular></div>',
                attachTo: angular.element(document.body),
                position: $mdPanel.newPanelPosition().center(),
                hasBackdrop: true,
            });
        };

        /**
         *  Shows a confirmation dialog with the given configuration.
         *  As seen at the declaration, the params are passed by an object with the attributes
         * named as follows.
         *
         * @param {string} message The text content of the dialog.
         * @param {string} title   The dialog's title.
         * @param {string} ok      The name on the confirmation button.
         * @param {string} cancel  The name on the cancel button.
         */
        this.confirm = function ({
                                     message = 'Are you sure you want to do this?',
                                     title = 'Are you sure?',
                                     ok = 'Yes',
                                     cancel = 'No'
                                 }) {
            const dialog = $mdDialog.confirm({
                title,
                textContent: message,
                ok,
                cancel
            });

            return $mdDialog.show(dialog);
        };

        /**
         * Opens an custom modal.
         *
         * @return {Promise} Promise, which evaluates to fulfilled when closed.
         */
        this.custom = function ({
                                    templateUrl,
                                    controller,
                                    targetEvent,
                                    clickOutsideToClose = true,
                                    escapeToClose = true,
                                    attachTo = angular.element(document.body),
                                    resolve = {}
                                }) {
            return $mdDialog.show({
                templateUrl,
                controller,
                clickOutsideToClose,
                escapeToClose,
                targetEvent,
                attachTo,
                parent: angular.element(document.body),
                resolve
            });
        };
    }])

    /**
     * Default modal controller.
     */
        .controller('ModalCtrl', ["$scope", "message", "title", '$mdDialog', function ($scope, message, title, $mdDialog) {

            $scope.message = message;

            $scope.title = title;

            $scope.ok = function () {
                $mdDialog.hide("close");
            };
        }]);
}());