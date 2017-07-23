package br.edu.ufcg.lebflix.managers;

import br.edu.ufcg.lebflix.entities.User;

/**
 * User's Manager/Service... Handles the simple user's logic.
 *
 * @author Estácio Pereira.
 */
public interface UsersManager {

    /**
     * Gets the logged user given the JWT.
     *
     * @param userToken The session token.
     * @return The logged user
     */
    User getLoggedUser(String userToken);

    /**
     * Registers an user.
     *
     * @param user User to be registered.
     * @return Registered user.
     */
    User registerUser(User user);

    /**
     * Logs the user in the application
     *
     * @param user User to be logged in.
     * @return Session token.
     */
    String login(User user);
}
