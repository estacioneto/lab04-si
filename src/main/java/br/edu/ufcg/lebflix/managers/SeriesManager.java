package br.edu.ufcg.lebflix.managers;

import br.edu.ufcg.lebflix.entities.Series;
import br.edu.ufcg.lebflix.entities.User;

import java.util.List;

/**
 * The Series manager/service/business logic handler.
 *
 * @author Estácio Pereira
 */
public interface SeriesManager {

    /**
     * Returns the user's profile's Series.
     *
     * @param user Logged user.
     * @return The logged user's profile's series.
     */
    List<Series> getProfileSeries(User user);

    /**
     * Returns the user's watchlist's Series.
     *
     * @param user Logged user.
     * @return The logged user's watchlist's series.
     */
    List<Series> getWatchlistSeries(User user);

    /**
     * Adds the series to the user's series.
     *
     * @param user   Logged user.
     * @param series Series to be added.
     * @return The added Series.
     */
    Series addSeries(User user, Series series);

    /**
     * Delete the series from the user's profile and/or watchlist.
     *
     * @param user     Logged user.
     * @param idSeries Id of the series to be removed.
     * @return The removed series.
     */
    Series deleteSeries(User user, Long idSeries);

    /**
     * Updates the series with the given id.
     *
     * @param user     Logged user.
     * @param idSeries Id of the series to be updated.
     * @param series   New series.
     * @return The updated series.
     */
    Series updateSeries(User user, Long idSeries, Series series);
}
