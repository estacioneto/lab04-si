(() => {
    'use strict';

    angular.module('userModule').controller('WatchlistController', ['SeriesService', 'ModalService', function (SeriesService, ModalService) {
        const self = this;

        /**
         * Indicates if the series listing will be able to provide details about the series.
         * @type {boolean}
         */
        this.showDetails = false;

        this.watchlist = {};

        (() => SeriesService.loadWatchlistSeriesList()
                .catch(err => ModalService.notifyError(`Loading profile series failed. ${(err.data.message || '')}`,err))
                .then(info => {
                    this.watchlist.series = SeriesService.watchlistSeries;
                })
        )();
    }]);
})();
