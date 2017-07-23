(() => {
    'use strict';

    /**
     * The User's main business logic service.
     *
     * @author Estácio Pereira.
     */
    angular.module('userModule', []).service('UserService', [function () {
        const self = this;

        this.profile = {
            series: []
        };

        this.watchlist = {
            series: []
        };

        /**
         * Removes the series from the user's profile.
         *
         * @param {Object} targetSeries Series to be removed.
         */
        this.removeFromProfile = function (targetSeries) {
            this.profile.series = this.profile.series
                .filter(series => series.imdbID !== targetSeries.imdbID);
        };

        /**
         * Verifies if th series is on the user's watchlist.
         *
         * @returns {boolean} {@code true} if the series is on the user's watchlist.
         */
        this.isOnWatchlist = function (targetSeries) {
            return _.some(this.watchlist.series, series => series.imdbID === targetSeries.imdbID);
        };

        /**
         * Verifies if th series is on the user's profile.
         *
         * @returns {boolean} {@code true} if the series is on the user's profile.
         */
        this.isOnProfile = function (targetSeries) {
            return _.some(this.profile.series, series => series.imdbID === targetSeries.imdbID);
        };

        /**
         * Adds the series to the user's watchlist.
         *
         * @returns {Promise} Dialog or Toast's promise.
         */
        this.addToWatchlist = function (series) {
            this.watchlist.series.push(series);
        };

        /**
         * Adds the series to the user's profile.
         *
         * @returns {Promise} Dialog or Toast's promise.
         */
        this.addToProfile = function (series) {
            this.profile.series.push(series);
            if (this.isOnWatchlist(series)) {
                removeFromWatchList(series);
            }
        };

        /**
         * Removes the series from the user's watchlist.
         *
         * @param {Object} targetSeries Series to be removed.
         */
        function removeFromWatchList(targetSeries) {
            self.watchlist.series = self.watchlist.series
                .filter(series => series.imdbID !== targetSeries.imdbID);
        }

    }]);
})();
