(() => {
    'use strict';

    /**
     * Series Card directive. The Series Card needs some logic, buttons... Well... This is the main directive.
     *
     * @param {Object}  series      Series (singular) to be shown.
     * @param {boolean} showDetails Indicates if the card will allow the user to load more information about the series.
     *
     * @author Estácio Pereira.
     */
    angular.module('seriesModule').directive('seriesCard', ['$q', 'ToastService', 'ModalService', 'UserService', 'SeriesService', function ($q, ToastService, ModalService, UserService, SeriesService) {
        return {
            restrict: 'AE',
            templateUrl: './view/directive/series/series-card.html',
            scope: {
                series: '=',
                showDetails: '='
            },
            link: function ($scope, element, attrs) {
                const {series} = $scope;

                /**
                 * Returns the displayed card title.
                 *
                 * @returns {string} Title to be displayed.
                 */
                $scope.getCardTitle = function () {
                    return series.Title;
                };

                /**
                 * Returns the displayed card subtitle.
                 *
                 * @returns {string} Subtitle to be displayed.
                 */
                $scope.getCardSubtitle = function () {
                    return `( ${series.Year} )`;
                };

                $scope.hasImagePoster = function () {
                    return series.Poster && (series.Poster !== 'N/A');
                };

                $scope.showDetailedSeries = function ($event) {
                    if ($scope.showDetails) {
                        return showSeriesDialog($event);
                    }
                };

                function showSeriesDialog($event) {
                    const templateUrl = './view/series-dialog.html',
                        controller = 'SeriesDialogController as SeriesDialogCtrl',
                        targetEvent = $event,
                        resolve = {series: () => $scope.series};
                    return $scope.loadDetails()
                        .then(info => ModalService.custom({templateUrl, controller, targetEvent, resolve}));
                }

                /**
                 * Loads the series' details and puts in the displayed series.
                 *
                 * @returns {Promise} Load promise.
                 */
                $scope.loadDetails = function () {
                    if (!series.Plot) {
                        return SeriesService.loadSingleSeries(series.Title)
                            .then(info => (info.data.Error) ? $q.reject(info) : info)
                            .catch(err => ModalService.notifyError(`Search failed. ${err.data.Error}`, err))
                            .then(info => {
                                Object.assign($scope.series, info.data);
                                return info;
                            });
                    }
                    return $q.when(series);
                };

                /**
                 * Adds the series to the user's profile.
                 *
                 * @returns {Promise} Dialog or Toast's promise.
                 */
                $scope.addToProfile = function () {
                    if (series.onProfile) {
                        return ModalService.error(`${series.Title} is on your profile already!`);
                    } else {
                        return SeriesService.addToProfile(series)
                            .catch(err => ModalService.notifyError(`Failed adding series to profile. ${(err.data.message || '')}`, err))
                            .then(info => ToastService.notifySuccess(`${series.Title} added to profile!`, info));
                    }
                };

                /**
                 * Adds the series to the user's watchlist.
                 *
                 * @returns {Promise} Dialog or Toast's promise.
                 */
                $scope.addToWatchlist = function () {
                    if (series.onProfile || series.onWatchlist) {
                        return ModalService.error(`${series.Title} is on your 
                        ${series.onProfile ? 'profile' : 'watchlist'} 
                        already! Cannot be added to your watchlist!`);
                    } else {
                        return SeriesService.addToWatchlist(series)
                            .catch(err => ModalService.notifyError(`Failed adding series to watchlist. ${(err.data.message || '')}`, err))
                            .then(info => ToastService.notifySuccess(`${series.Title} added to watchlist!`, info));
                    }
                };

                /**
                 * Removes the series from the user's profile if he/she/it confirms.
                 *
                 * @returns {Promise} Confirmation dialog's promise.
                 */
                $scope.removeFromProfile = function () {
                    const message = `Do you really want to remove "${series.Title}" from your profile?`;
                    return ModalService.confirm({message})
                        .then(confirmation => removeFromProfile());
                };

                /**
                 * Removes the series from the user's profile.
                 *
                 * @returns {Promise} Toast's promise.
                 */
                function removeFromProfile() {
                    return SeriesService.removeFromProfile(series)
                        .catch(err => ModalService.notifyError(`Failed removing series from profile. ${(err.data.message || '')}`, err))
                        .then(info => ToastService.notifySuccess(`${series.Title} removed from profile!`, info));
                }
            }
        };
    }]);
})();