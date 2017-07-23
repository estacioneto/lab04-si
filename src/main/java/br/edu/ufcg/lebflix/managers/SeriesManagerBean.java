package br.edu.ufcg.lebflix.managers;

import br.edu.ufcg.lebflix.dao.SeriesDAO;
import br.edu.ufcg.lebflix.entities.Series;
import br.edu.ufcg.lebflix.entities.User;
import br.edu.ufcg.lebflix.exception.AccessDeniedException;
import br.edu.ufcg.lebflix.exception.UnsupportedOperationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

import static br.edu.ufcg.lebflix.exception.AccessDeniedMessage.DOESNT_OWN_THE_SERIES;
import static br.edu.ufcg.lebflix.exception.UnsupportedOperationMessage.EXISTENT_SERIES;

/**
 * The Series manager/service/business logic handler implementation.
 *
 * @author Estácio Pereira
 */
@Service
@Transactional
public class SeriesManagerBean implements SeriesManager {

    @Autowired
    private SeriesDAO seriesDAO;

    @Override
    public List<Series> getProfileSeries(User user) {
        return seriesDAO.getProfileSeries(user.getId());
    }

    @Override
    public List<Series> getWatchlistSeries(User user) {
        return seriesDAO.getWatchlistSeries(user.getId());
    }

    @Override
    public Series addSeries(User user, Series series) {
        series.setIdUser(user.getId());
        if (seriesDAO.existsSeries(user.getId(), series.getImdbID())) {
            throw new UnsupportedOperationException(EXISTENT_SERIES);
        }
        seriesDAO.persistSeries(series);
        return series;
    }

    @Override
    public Series deleteSeries(User user, Long idSeries) {
        if (seriesDAO.isSeriesOwner(user.getId(), idSeries)) {
            Series series = seriesDAO.getSeries(idSeries);
            seriesDAO.removeSeries(series);
            series.setId(null);
            series.setOnProfile(false);
            series.setOnWatchlist(false);
            return series;
        }
        throw new AccessDeniedException(DOESNT_OWN_THE_SERIES);
    }

    @Override
    public Series updateSeries(User user, Long idSeries, Series series) {
        if (seriesDAO.isSeriesOwner(user.getId(), idSeries)) {
            return seriesDAO.updateSeries(series);
        }
        throw new AccessDeniedException(DOESNT_OWN_THE_SERIES);
    }
}
