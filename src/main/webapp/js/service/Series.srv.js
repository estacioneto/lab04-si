(() => {
    'use strict';

    /**
     * The series main business logic service. Initially, loads the main entities of the app.
     *
     * @author Estácio Pereira.
     */
    angular.module('seriesModule', []).service('SeriesService', ['$q', '$http', 'UserService', 'API_URIS', function ($q, $http, UserService, API_URIS) {
        const self = this;
        const seriesListUrl = 'https://omdbapi.com/?s=TITLE&apikey=93330d3c&type=series',
            singleSeriesUrl = 'https://omdbapi.com/?t=TITLE&apikey=93330d3c&type=series';

        this.profileSeries = [];
        this.watchlistSeries = [];

        /**
         * Loads the list of the series whose title matches with the given one.
         *
         * @param  {string}  title Title to match the series.
         * @return {Promise} Load promise
         */
        this.loadSeriesList = function (title) {
            const uri = encodeURI(seriesListUrl.replace(/TITLE/, title));
            return $http.get(uri);
        };

        /**
         * Loads the series (singular) whose title matches with the given one.
         *
         * @param  {string}  title Title of the series.
         * @return {Promise} Load promise
         */
        this.loadSingleSeries = function (title) {
            const uri = encodeURI(singleSeriesUrl.replace(/TITLE/, title));
            return $http.get(uri);
        };

        this.loadProfileSeriesList = function () {
            return $http.get(API_URIS.PROFILE_SERIES)
                .then(info => {
                    this.profileSeries = info.data;
                    return info;
                });
        };

        this.loadWatchlistSeriesList = function () {
            return $http.get(API_URIS.WATCHLIST_SERIES)
                .then(info => {
                    this.watchlistSeries = info.data;
                    return info;
                });
        };

        this.addToProfile = function (series) {
            const sentSeries = angular.copy(series);
            sentSeries.onProfile = true;
            sentSeries.onWatchlist = false;
            return this.saveSeries(sentSeries)
                .then(info => {
                    if (series.onWatchlist) {
                        removeFromWatchlistSeries(series);
                    }
                    Object.assign(series, info.data);
                    return info;
                });
        };

        function removeFromWatchlistSeries(targetSeries) {
            _.remove(self.watchlistSeries, series => series.imdbID === targetSeries.imdbID);
        }

        this.addToWatchlist = function (series) {
            const sentSeries = angular.copy(series);
            sentSeries.onProfile = false;
            sentSeries.onWatchlist = true;
            return this.saveSeries(sentSeries)
                .then(info => {
                    Object.assign(series, info.data);
                    return info;
                });
        };

        function removeFromProfileSeries(targetSeries) {
            _.remove(self.profileSeries, series => series.imdbID === targetSeries.imdbID);
        }

        this.saveSeries = function (series) {
            const method = series.id ? $http.put : $http.post;
            const uri = series.id ? (API_URIS.SERIES + `/${series.id}`) : API_URIS.SERIES;
            return method(uri, series);
        };

        this.removeFromProfile = function (series) {
            return $http.delete(API_URIS.SERIES + `/${series.id}`, series)
                .then(info => {
                    removeFromProfileSeries(series);
                    clearSeriesInfo(series);
                    return info;
                });
        };

        function clearSeriesInfo(series) {
            delete series.id;
            delete series.onProfile;
            delete series.onWatchlist;
            delete series.season;
            delete series.lastEpisode;
            delete series.rate;
        }
    }]);
})();
