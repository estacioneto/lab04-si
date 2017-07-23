package br.edu.ufcg.lebflix.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * Created by estacio on 13/07/17.
 */
@Entity
@Table(name = "TB_SERIES")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Series implements Serializable {

    private static final long serialVersionUID = 4302522548712194679L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "IMDB_ID", updatable = false)
    private String imdbID;

    @Column(name = "POSTER")
    private String Poster;

    @Column(name = "TITLE")
    private String Title;

    @Column(name = "YEAR")
    private String Year;

    @Column(name = "RATE")
    private Double rate;

    @Column(name = "SEASON")
    private Long season;

    @Column(name = "EPISODE")
    private String lastEpisode;

    @NotNull
    @Column(name = "ON_PROFILE")
    private Boolean onProfile;

    @NotNull
    @Column(name = "ON_WATCHLIST")
    private Boolean onWatchlist;

    @NotNull
    @Column(name = "ID_USER")
    private Long idUser;

    public Series() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImdbID() {
        return imdbID;
    }

    public void setImdbID(String imdbID) {
        this.imdbID = imdbID;
    }

    @JsonProperty(value = "Poster")
    public String getPoster() {
        return Poster;
    }

    @JsonProperty(value = "Poster")
    public void setPoster(String poster) {
        Poster = poster;
    }

    @JsonProperty(value = "Title")
    public String getTitle() {
        return Title;
    }

    @JsonProperty(value = "Title")
    public void setTitle(String title) {
        Title = title;
    }

    @JsonProperty(value = "Year")
    public String getYear() {
        return Year;
    }

    @JsonProperty(value = "Year")
    public void setYear(String year) {
        Year = year;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Long getSeason() {
        return season;
    }

    public void setSeason(Long season) {
        this.season = season;
    }

    public String getLastEpisode() {
        return lastEpisode;
    }

    public void setLastEpisode(String lastEpisode) {
        this.lastEpisode = lastEpisode;
    }

    public Boolean getOnProfile() {
        return onProfile;
    }

    public void setOnProfile(Boolean onProfile) {
        this.onProfile = onProfile;
    }

    public Boolean getOnWatchlist() {
        return onWatchlist;
    }

    public void setOnWatchlist(Boolean onWatchlist) {
        this.onWatchlist = onWatchlist;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }
}
