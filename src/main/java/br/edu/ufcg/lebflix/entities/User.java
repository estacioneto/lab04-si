package br.edu.ufcg.lebflix.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

/**
 * Created by estacio on 13/07/17.
 */
@Entity
@Table(name = "TB_USER")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User implements Serializable {

    private static final long serialVersionUID = -9207339110231485498L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "EMAIL", unique = true)
    private String email;

    @NotNull
    @Column(name = "PASSWORD")
    private String password;

    @NotNull
    @Column(name = "NAME")
    private String name;

    public User() {
    }

    public User(Long id) {
        this.id = id;
    }

    /**
     * JWT Constructor. Uses the only needed information given from a token.
     *
     * @param id    User's id.
     * @param email User's email.
     */
    public User(Long id, String email) {
        this(id);
        this.email = email;
    }

    public User(Long id, String email, String name) {
        this(id, email);
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
