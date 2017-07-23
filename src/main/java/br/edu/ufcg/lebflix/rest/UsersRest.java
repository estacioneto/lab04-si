package br.edu.ufcg.lebflix.rest;

import br.edu.ufcg.lebflix.entities.User;
import br.edu.ufcg.lebflix.managers.UsersManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Users' endpoint
 *
 * @author Estácio Pereira.
 * @value /api/users
 */
@RestController
@RequestMapping(value = "/api/users")
public class UsersRest {

    @Autowired
    private UsersManager usersManager;

    /**
     * Register the user in the application.
     *
     * @param user User to be registered.
     * @return The registered user.
     */
    @RequestMapping(value = {"/", ""}, method = RequestMethod.POST)
    public User registerUser(@RequestBody User user) {
        return usersManager.registerUser(user);
    }

    /**
     * Returns the user's data (but never the password).
     *
     * @param Authorization Authorization header containing the Session Token.
     * @return The logged user.
     */
    @RequestMapping(value = {"/", ""}, method = RequestMethod.GET)
    public User getUser(@RequestHeader String Authorization) {
        return usersManager.getLoggedUser(Authorization);
    }

    /**
     * Login endpoint. The user logs into the application.
     *
     * @param user User to be logged in.
     * @return An object containing the Session Token.
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody User user) {
        return "{\"token\" : \"" + usersManager.login(user) + "\"}";
    }
}
