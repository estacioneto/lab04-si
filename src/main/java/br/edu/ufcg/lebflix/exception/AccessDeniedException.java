package br.edu.ufcg.lebflix.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown when the user has no access to that operation.
 * Status: 403.
 *
 * @author Estácio Pereira
 */
@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class AccessDeniedException extends RuntimeException {

    private static final long serialVersionUID = 4582682791089530231L;

    /**
     * The exception's constructor
     *
     * @param accessDeniedMessage An Enum containing the message to be thrown.
     */
    public AccessDeniedException(AccessDeniedMessage accessDeniedMessage) {
        super(accessDeniedMessage.getMessage());
    }
}
