package br.edu.ufcg.lebflix.dao;

import br.edu.ufcg.lebflix.entities.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

/**
 * Users database handler.
 *
 * @author Estácio Pereira
 */
@Repository
public class UsersDAO {

    private static final Long EXISTS = 1L;

    private static final String QUERY_USER_EXISTS_BY_EMAIL = new StringBuilder()
            .append("SELECT COUNT(1) ")
            .append("FROM User u ")
            .append("WHERE u.email=:email ")
            .toString();

    private static final String QUERY_USER_EXISTS_BY_EMAIL_AND_PASSWORD = new StringBuilder()
            .append(QUERY_USER_EXISTS_BY_EMAIL)
            .append("AND u.password=:password ")
            .toString();

    private static final String QUERY_USER_BY_EMAIL = new StringBuilder()
            .append("SELECT new User(u.id, u.email, u.name) ")
            .append("FROM User u ")
            .append("WHERE u.email=:email ")
            .toString();

    // We want to hide the password, so we don't use the `entityManager.find()` method here.
    private static final String QUERY_USER_BY_ID = new StringBuilder()
            .append("SELECT new User(u.id, u.email, u.name) ")
            .append("FROM User u ")
            .append("WHERE u.id=:id ")
            .toString();

    @PersistenceContext
    private EntityManager entityManager;

    /**
     * Returns the user given the id.
     *
     * @param id User's id.
     * @return The User with the given id.
     */
    public User getUserById(Long id) {
        TypedQuery<User> getUserQuery = entityManager.createQuery(QUERY_USER_BY_ID, User.class);
        getUserQuery.setParameter("id", id);
        return getUserQuery.getSingleResult();
    }

    /**
     * Persists the user in the application's database.
     *
     * @param user User to be persisted.
     */
    public void persistUser(User user) {
        entityManager.persist(user);
    }

    /**
     * Verifies the user's existence.
     *
     * @param email    User's email
     * @param password User's password
     * @return {@code true} if there is an user with the given email and password.
     */
    public boolean existsUser(String email, String password) {
        TypedQuery<Long> getUserQuery = entityManager.createQuery(QUERY_USER_EXISTS_BY_EMAIL_AND_PASSWORD, Long.class);
        getUserQuery.setParameter("email", email);
        getUserQuery.setParameter("password", password);
        return EXISTS.equals(getUserQuery.getSingleResult());
    }

    /**
     * Returns the user with the given email.
     *
     * @param email User's email.
     * @return The user with the given email.
     */
    public User getUserByEmail(String email) {
        TypedQuery<User> getUserQuery = entityManager.createQuery(QUERY_USER_BY_EMAIL, User.class);
        getUserQuery.setParameter("email", email);
        return getUserQuery.getSingleResult();
    }

    /**
     * Verifies the existence of an user with the given email.
     *
     * @param email User's email.
     * @return {@code true} if there is an user with the given email.
     */
    public boolean existsUserWithEmail(String email) {
        TypedQuery<Long> getUserQuery = entityManager.createQuery(QUERY_USER_EXISTS_BY_EMAIL, Long.class);
        getUserQuery.setParameter("email", email);
        return EXISTS.equals(getUserQuery.getSingleResult());
    }
}
