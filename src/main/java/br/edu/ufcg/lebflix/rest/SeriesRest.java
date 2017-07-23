package br.edu.ufcg.lebflix.rest;

import br.edu.ufcg.lebflix.entities.Series;
import br.edu.ufcg.lebflix.entities.User;
import br.edu.ufcg.lebflix.managers.SeriesManager;
import br.edu.ufcg.lebflix.managers.UsersManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Series' endpoint.
 *
 * @author Estácio Pereira.
 * @value /api/series
 */
@RestController
@RequestMapping(value = "/api/series")
public class SeriesRest {

    @Autowired
    private SeriesManager seriesManager;

    @Autowired
    private UsersManager usersService;

    /**
     * Method GET for the profile's series list. Returns the list.
     *
     * @param Authorization Authorization header. It's very important, because tells the server who is the logged user.
     * @return List containing the profile's series.
     */
    @RequestMapping(value = "/profile", method = RequestMethod.GET)
    public List<Series> getProfileSeries(@RequestHeader String Authorization) {
        User user = usersService.getLoggedUser(Authorization);
        return seriesManager.getProfileSeries(user);
    }

    /**
     * Method GET for the watchlist's series list. Returns the list.
     *
     * @param Authorization Authorization header. It's very important, because tells the server who is the logged user.
     * @return List containing the watchlist's series.
     */
    @RequestMapping(value = "/watchlist", method = RequestMethod.GET)
    public List<Series> getWatchlistSeries(@RequestHeader String Authorization) {
        User user = usersService.getLoggedUser(Authorization);
        return seriesManager.getWatchlistSeries(user);
    }

    /**
     * Method POST for the series. Adds a series to the user's profile or watchlist.
     *
     * @param Authorization Authorization header. It's very important, because tells the server who is the logged user.
     * @param series        Series to be added.
     * @return The added series after some changes.
     */
    @RequestMapping(value = {"/", ""}, method = RequestMethod.POST)
    public Series addSeries(@RequestHeader String Authorization, @RequestBody Series series) {
        User user = usersService.getLoggedUser(Authorization);
        return seriesManager.addSeries(user, series);
    }

    /**
     * Method DELETE for the series. Deletes the series from the user. It won't be available on his watchlist or profile.
     *
     * @param Authorization Authorization header. It's very important, because tells the server who is the logged user.
     * @param idSeries      Id of the series the user wants to delete.
     * @return The deleted series.
     */
    @RequestMapping(value = "/{idSeries}", method = RequestMethod.DELETE)
    public Series deleteSeries(@RequestHeader String Authorization, @PathVariable Long idSeries) {
        User user = usersService.getLoggedUser(Authorization);
        return seriesManager.deleteSeries(user, idSeries);
    }

    /**
     * Method PUT for the user's series. Updates a series.
     *
     * @param Authorization Authorization header. It's very important, because tells the server who is the logged user.
     * @param idSeries      Id of the series to be updated.
     * @param series        The new series.
     * @return The updated series.
     */
    @RequestMapping(value = "/{idSeries}", method = RequestMethod.PUT)
    public Series updateSeries(@RequestHeader String Authorization,
                               @PathVariable Long idSeries,
                               @RequestBody Series series) {
        User user = usersService.getLoggedUser(Authorization);
        return seriesManager.updateSeries(user, idSeries, series);
    }
}
