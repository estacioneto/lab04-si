(() => {
    'use strict';

    /**
     * The Profile page Controller.
     *
     * @author Estácio Pereira.
     */
    angular.module('userModule').controller('ProfileController', ['SeriesService', 'ModalService', function (SeriesService, ModalService) {
        const self = this;

        /**
         * Indicates if the series listing will be able to provide details about the series.
         * @type {boolean}
         */
        this.showDetails = true;

        this.profile = {};

        (() => SeriesService.loadProfileSeriesList()
            .catch(err => ModalService.notifyError(`Loading profile series failed. ${(err.data.message || '')}`,err))
            .then(info => {
                this.profile.series = SeriesService.profileSeries;
            })
        )();
    }]);
})();
