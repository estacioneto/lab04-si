package br.edu.ufcg.lebflix.exception;

import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception to encapsulate the token invalidation.
 * Status: 401.
 *
 * @author Estácio Pereira.
 */
@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InvalidJWTException extends JWTVerificationException {

    /**
     * Constructor.
     *
     * @param message Exception's message.
     */
    public InvalidJWTException(String message) {
        super(message);
    }
}
