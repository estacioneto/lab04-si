(() => {
    'use strict';

    /**
     * The Home page Controller. It has almost no responsibilities to itself
     * but pass the data to the directives and notify the user about some error searching fo the series.
     *
     * @author Estácio Pereira.
     */
    angular.module('homeModule', []).controller('HomeController', ['$q', 'ModalService', 'UserService', 'SeriesService', function ($q, ModalService, UserService, SeriesService) {
        const self = this;

        /**
         * Indicates if the series listing will be able to provide details about the series.
         * @type {boolean}
         */
        this.showDetails = true;

        /**
         * Object containing the searched series as 'values'. Initially, the series are the Profile's series.
         * @type {{values: Array}}
         */
        this.searchedSeries = {
            series: UserService.profile.series
        }; // Directives, array reference...

        /**
         * Searches for the series with the given title (or contains the given title) and
         * changes the values of the {@code searchedSeries} to be shown.
         *
         * @param   {string}  title Title to be searched.
         * @returns {Promise} Search's promise.
         */
        this.searchSeries = title => {
            return SeriesService.loadSeriesList(title)
                .then(info => (!info.data.Search) ? $q.reject(info) : info) // Yes... This is an API error.
                .catch(err => ModalService.notifyError(`Search failed. ${err.data.Error}`, err))
                .then(info => {
                    this.searchedSeries.series = info.data.Search;
                    return info;
                });
        };
    }]);
})();
