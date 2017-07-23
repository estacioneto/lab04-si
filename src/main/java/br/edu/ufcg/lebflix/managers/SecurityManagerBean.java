package br.edu.ufcg.lebflix.managers;

import br.edu.ufcg.lebflix.entities.User;
import br.edu.ufcg.lebflix.exception.AccessDeniedException;
import br.edu.ufcg.lebflix.exception.InvalidJWTException;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.common.collect.Iterables;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Arrays;

import static br.edu.ufcg.lebflix.exception.AccessDeniedMessage.MISSING_AUTHORIZATION;

/**
 * Security Manager. Handles security issues with JSON Web Tokens.
 *
 * @author Estácio Pereira.
 */
@Service
@Transactional
public class SecurityManagerBean implements SecurityManager {

    private static final int RSA_KEY_SIZE = 512;
    private Algorithm algorithm;

    private static final String ID_CLAIM = "id";

    /**
     * Bean constructor. Initializes the main properties needed to do the Security Management.
     *
     * @throws UnsupportedEncodingException Thrown in some error on the RSA keys.
     * @throws NoSuchAlgorithmException     Thrown when trying to get the algorithm.
     */
    public SecurityManagerBean() throws UnsupportedEncodingException, NoSuchAlgorithmException {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
        keyPairGenerator.initialize(RSA_KEY_SIZE);
        KeyPair keyPair = keyPairGenerator.genKeyPair();

        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();
        this.algorithm = Algorithm.RSA256(publicKey, privateKey);
    }

    /**
     * Verifies and decodes the given JWT.
     *
     * @param token The JWT.
     * @return The decoded JWT.
     */
    private DecodedJWT getDecodedJWT(String token) {
        try {
            JWTVerifier verifier = JWT.require(this.algorithm)
                    .build();
            return verifier.verify(token);
        } catch (JWTVerificationException exception) {
            throw new InvalidJWTException(exception.getMessage());
        }
    }

    @Override
    public String generateToken(User user) {
        return JWT.create()
                .withClaim(ID_CLAIM, user.getId())
                .sign(this.algorithm);
    }

    @Override
    public User getUserFromToken(String token) {
        DecodedJWT jwt = getDecodedJWT(token);
        Long id = jwt.getClaim(ID_CLAIM).asLong();

        return new User(id);
    }

    @Override
    public User getUserFromAuthorizationHeader(String authorization) {
        String token = getTokenByHeaderAuthorization(authorization);
        return getUserFromToken(token);
    }

    /**
     * The logic behind the extraction of the token from the Authorization header.
     *
     * @param authorization Authorization Header.
     * @return The token in the header.
     */
    private String getTokenByHeaderAuthorization(String authorization) {
        if (authorization != null) {
            String token = Iterables.getLast(Arrays.asList(authorization.split(" ")));
            if (token == null) {
                throw new AccessDeniedException(MISSING_AUTHORIZATION);
            }
            return token;
        }
        throw new AccessDeniedException(MISSING_AUTHORIZATION);
    }

}
