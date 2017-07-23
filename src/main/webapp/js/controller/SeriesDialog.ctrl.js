(() => {

    angular.module('seriesModule').controller('SeriesDialogController', ['SeriesService', 'UserService', 'ModalService', 'ToastService', 'series', function (SeriesService, UserService, ModalService, ToastService, series) {

        this.series = series;

        /**
         * Returns the displayed card title.
         *
         * @returns {string} Title to be displayed.
         */
        this.getCardTitle = function () {
            return series.Title;
        };

        /**
         * Returns the displayed card subtitle.
         *
         * @returns {string} Subtitle to be displayed.
         */
        this.getCardSubtitle = function () {
            return `( ${series.Year} )`;
        };

        this.hasImagePoster = () => series.Poster !== 'N/A';

        /**
         * Adds the series to the user's profile.
         *
         * @returns {Promise} Dialog or Toast's promise.
         */
        this.addToProfile = function () {
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
        this.addToWatchlist = function () {
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

        this.saveSeries = () => SeriesService.saveSeries(series)
            .catch(err => ModalService.notifyError(`Failed saving the series. ${(err.data.message || '')}`, err))
            .then(info => ToastService.notifySuccess(`${series.Title} updated!`, info));

        /**
         * Removes the series from the user's profile if he/she/it confirms.
         *
         * @returns {Promise} Confirmation dialog's promise.
         */
        this.removeFromProfile = function () {
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
    }]);
})();
