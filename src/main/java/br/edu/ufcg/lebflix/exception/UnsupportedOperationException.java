package br.edu.ufcg.lebflix.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * UnsupportedOperationException's adapter. With this exception, we can dictate the Status returned.
 * Status: 400
 *
 * @author Estácio Pereira.
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UnsupportedOperationException extends java.lang.UnsupportedOperationException {

    /**
     * Main Constructor
     *
     * @param message Exception's message.
     */
    public UnsupportedOperationException(String message) {
        super(message);
    }

    /**
     * Custom constructor to accept the Enums.
     *
     * @param unsupportedOperationMessage An Enum with the message to be thrown.
     */
    public UnsupportedOperationException(UnsupportedOperationMessage unsupportedOperationMessage) {
        super(unsupportedOperationMessage.getMessage());
    }
}
