package br.edu.ufcg.lebflix.managers;

import br.edu.ufcg.lebflix.dao.UsersDAO;
import br.edu.ufcg.lebflix.entities.User;
import br.edu.ufcg.lebflix.exception.AccessDeniedException;
import br.edu.ufcg.lebflix.exception.UnsupportedOperationMessage;
import br.edu.ufcg.lebflix.exception.UnsupportedOperationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import static br.edu.ufcg.lebflix.exception.AccessDeniedMessage.INEXISTENT_USER;
import static br.edu.ufcg.lebflix.exception.AccessDeniedMessage.WRONG_EMAIL_OR_PASSWORD;

/**
 * Created by estacio on 13/07/17.
 */
@Service
@Transactional
public class UsersManagerBean implements UsersManager {


    @Autowired
    private SecurityManager securityManager;

    @Autowired
    private UsersDAO usersDAO;

    @Override
    public User getLoggedUser(String authorizationHeader) {
        User jwtUser = securityManager.getUserFromAuthorizationHeader(authorizationHeader);
        return usersDAO.getUserById(jwtUser.getId());
    }

    @Override
    public User registerUser(User user) {
        boolean existsUser = usersDAO.existsUserWithEmail(user.getEmail());
        if (existsUser) {
            throw new UnsupportedOperationException(UnsupportedOperationMessage.EXISITING_USER);
        }
        usersDAO.persistUser(user);
        return new User(user.getId(), user.getEmail(), user.getName());
    }

    @Override
    public String login(User user) {
        boolean existsUser = usersDAO.existsUser(user.getEmail(), user.getPassword());
        if (existsUser) {
            User userDatabase = usersDAO.getUserByEmail(user.getEmail());
            return securityManager.generateToken(userDatabase);
        } else {
            throw new AccessDeniedException(WRONG_EMAIL_OR_PASSWORD);
        }
    }
}
