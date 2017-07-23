package br.edu.ufcg.lebflix.exception;

/**
 * Enum to encapsulate the UnsupportedOperationException's messages.
 *
 * @author Estácio Pereira.
 */
public enum UnsupportedOperationMessage {

    EXISITING_USER("A user with this email already exists."),
    EXISTENT_SERIES("You already have this Series on profile or watchlist.");

    private String message;

    /**
     * Private constructor.
     *
     * @param message The exception's message.
     */
    private UnsupportedOperationMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }
}
