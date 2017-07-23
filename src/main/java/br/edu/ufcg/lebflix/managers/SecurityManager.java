package br.edu.ufcg.lebflix.managers;

import br.edu.ufcg.lebflix.entities.User;

/**
 * Security Manager/Service/Handler. Basically, the application security.
 *
 * @author Estácio Pereira.
 */
public interface SecurityManager {

    /**
     * Generates a JSON Web Token (JWT) given the user.
     *
     * @param user User to have the JWT generated.
     * @return The generated JWT.
     */
    String generateToken(User user);

    /**
     * Returns the user given in the token information.
     *
     * @param token Session Token.
     * @return User in the Token.
     */
    User getUserFromToken(String token);

    /**
     * Given the Authorization header, it extracts the Token and returns the user.
     *
     * @param authorization Authorization header.
     * @return The logged user.
     */
    User getUserFromAuthorizationHeader(String authorization);
}
