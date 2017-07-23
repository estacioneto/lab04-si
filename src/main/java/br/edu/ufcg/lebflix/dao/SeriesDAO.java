package br.edu.ufcg.lebflix.dao;

import br.edu.ufcg.lebflix.entities.Series;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Series database handler.
 *
 * @author Estácio Pereira
 */
@Repository
public class SeriesDAO {

    private static final String QUERY_PROFILE_SERIES = new StringBuilder()
            .append("SELECT s ")
            .append("FROM Series s ")
            .append("WHERE s.idUser=:idUser ")
            .append("AND s.onProfile IS TRUE ")
            .toString();

    private static final String QUERY_WATCHLIST_SERIES = new StringBuilder()
            .append("SELECT s ")
            .append("FROM Series s ")
            .append("WHERE s.idUser=:idUser ")
            .append("AND s.onWatchlist IS TRUE ")
            .toString();

    private static final String QUERY_SERIES_EXISTS = new StringBuilder()
            .append("SELECT COUNT(1) ")
            .append("FROM Series s ")
            .append("WHERE s.idUser=:idUser ")
            .append("AND s.imdbID=:imdbID ")
            .toString();

    private static final Long EXISTS = 1L;

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Queries the profile's series.
     *
     * @param idUser Logged user's id.
     * @return Logged user's profile's series.
     */
    public List<Series> getProfileSeries(Long idUser) {
        TypedQuery<Series> query = entityManager.createQuery(QUERY_PROFILE_SERIES, Series.class);
        query.setParameter("idUser", idUser);
        return query.getResultList();
    }

    /**
     * Queries the watchlist's series.
     *
     * @param idUser Logged user's id.
     * @return Logged user's watchlist's series.
     */
    public List<Series> getWatchlistSeries(Long idUser) {
        TypedQuery<Series> query = entityManager.createQuery(QUERY_WATCHLIST_SERIES, Series.class);
        query.setParameter("idUser", idUser);
        return query.getResultList();
    }

    /**
     * Persists a series to the application's database.
     *
     * @param series Series to be persisted.
     */
    public void persistSeries(Series series) {
        entityManager.persist(series);
    }

    /**
     * Verifies if the user owns the series, meaning the series has the user's id.
     *
     * @param idUser   User's id
     * @param idSeries Series' id
     * @return {@code true} if the user owns the series.
     */
    public boolean isSeriesOwner(Long idUser, Long idSeries) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("idUser", idUser);
        return entityManager.find(Series.class, idSeries, parameters) != null;
    }

    /**
     * Returns the full series.
     *
     * @param idSeries Series' id.
     * @return The full series.
     */
    public Series getSeries(Long idSeries) {
        return entityManager.find(Series.class, idSeries);
    }

    /**
     * Removes the series from the database.
     *
     * @param series Series to be removed.
     */
    public void removeSeries(Series series) {
        entityManager.remove(series);
    }

    /**
     * Updates the series.
     *
     * @param series New series.
     * @return The updated series.
     */
    public Series updateSeries(Series series) {
        series = entityManager.merge(series);
        entityManager.flush();
        entityManager.refresh(series);
        return series;
    }

    /**
     * Verifies the series' existence.
     *
     * @param idUser User's id.
     * @param imdbID The Series' IMDB id.
     * @return {@code true} if the series exists.
     */
    public boolean existsSeries(Long idUser, String imdbID) {
        TypedQuery<Long> getUserQuery = entityManager.createQuery(QUERY_SERIES_EXISTS, Long.class);
        getUserQuery.setParameter("idUser", idUser);
        getUserQuery.setParameter("imdbID", imdbID);
        return EXISTS.equals(getUserQuery.getSingleResult());
    }
}
