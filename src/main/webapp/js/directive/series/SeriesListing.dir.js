(() => {
    'use strict';

    /**
     * Series listing directive. Encapsulates the listing logic, because we deal with matrix to make it prettier.
     *
     * @author Estácio Pereira.
     */
    angular.module('seriesModule').directive('seriesListing', ['$window', function ($window) {
        return {
            restrict: 'AE',
            templateUrl: './view/directive/series/series-listing.html',
            scope: {
                seriesList: '=', // Yes... This is an Object... Arrays do not Two way, so I had to hack it that way.
                showDetails: '='
            },
            link: function ($scope, element, attrs) {

                // TODO: Delete this asap, @author Guess Who?
                // $scope.seriesList.series = [{"Title":"Prison Break","Year":"2005–2009","Rated":"TV-14","Released":"29 Aug 2005","Runtime":"44 min","Genre":"Action, Crime, Drama","Director":"N/A","Writer":"Paul Scheuring","Actors":"Dominic Purcell, Wentworth Miller, Amaury Nolasco, Robert Knepper","Plot":"Due to a political conspiracy, an innocent man is sent to death row and his only hope is his brother, who makes it his mission to deliberately get himself sent to the same prison in order to break the both of them out, from the inside.","Language":"English, Spanish","Country":"USA","Awards":"Nominated for 2 Golden Globes. Another 4 wins & 24 nominations.","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTg3NTkwNzAxOF5BMl5BanBnXkFtZTcwMjM1NjI5MQ@@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.5/10"}],"Metascore":"N/A","imdbRating":"8.5","imdbVotes":"367,050","imdbID":"tt0455275","Type":"series","totalSeasons":"4","Response":"True"},{"Title":"Prison Break: Resurrection","Year":"2017–","imdbID":"tt4928092","Type":"series","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ4NjY5ODYyOV5BMl5BanBnXkFtZTgwNjgzODU3MTI@._V1_SX300.jpg"},{"Title":"Wentworth Prison","Year":"2013–","imdbID":"tt2433738","Type":"series","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMjM4NTM1ODQ2MF5BMl5BanBnXkFtZTgwMzY1OTM3MzE@._V1_SX300.jpg"},{"Title":"Prison School","Year":"2015–","imdbID":"tt4917066","Type":"series","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYWU4ZGJlYjgtOTE5MS00NzcyLWE0MWUtNjA2NmI5ZjIwY2E4XkEyXkFqcGdeQXVyMTA1OTEwNjE@._V1_SX300.jpg"},{"Title":"Prison Break: Proof of Innocence","Year":"2006","imdbID":"tt0825355","Type":"series","Poster":"N/A"},{"Title":"Prison Logic: Tijuana Jackson","Year":"2011–","imdbID":"tt2397690","Type":"series","Poster":"N/A"},{"Title":"Her Majesty's Prison: Aylesbury","Year":"2013–","imdbID":"tt2626976","Type":"series","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTJlNjcyMjctOTUyZi00YzQxLTgxYjMtMGZmODIwZjkzMTZjXkEyXkFqcGdeQXVyMzQzOTc2Mw@@._V1_SX300.jpg"},{"Title":"The Flower in Prison","Year":"2016–","imdbID":"tt5679558","Type":"series","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYTYxOTVmZjctNWI1NC00NjNlLWEzMzctM2Q2ZWY0MWZjZTQ0XkEyXkFqcGdeQXVyMzE4MDkyNTA@._V1_SX300.jpg"},{"Title":"Prison Wives","Year":"2010–","imdbID":"tt1571094","Type":"series","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwNjU4NDY1MV5BMl5BanBnXkFtZTgwMzUzMjgwMzE@._V1_SX300.jpg"},{"Title":"Women in Prison","Year":"1987–1988","imdbID":"tt0092485","Type":"series","Poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BZTA5ZDA4NDYtYTJmNy00NWQ5LThjOGYtZDk2YWUwNjRhZmUwXkEyXkFqcGdeQXVyMjcyMDU4NA@@._V1_SX300.jpg"}];

                const MIN_WIDTH = 600, CARD_WIDTH = 250, MAX_COLUMNS = 4;

                function getSeriesMatrix() {
                    const matrix = getEmptyMatrix();
                    _.each($scope.seriesList.series, (series, index) => {
                        matrix[index % matrix.length].push(series);
                    });
                    return matrix;
                }

                function getEmptyMatrix() {
                    let width = $window.innerWidth - MIN_WIDTH;
                    const matrix = [];
                    do {
                        matrix.push([]);
                        width -= CARD_WIDTH;
                    } while ((width > 0) && (matrix.length !== MAX_COLUMNS));

                    return matrix;
                }

                $scope.displayedSeries = {
                    series: getSeriesMatrix()
                };

                $scope.$watchCollection(() => $scope.seriesList.series, () => {
                    $scope.displayedSeries.series = getSeriesMatrix();
                });

                angular.element($window).bind('resize', () => {
                    const seriesMatrix = getEmptyMatrix();
                    if (seriesMatrix.length !== $scope.displayedSeries.series.length) {
                        $scope.displayedSeries.series = getSeriesMatrix();
                        $scope.$digest();
                    }
                });
            }
        };
    }]);
})();