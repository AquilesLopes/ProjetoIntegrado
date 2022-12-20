package br.com.validatecaepi.security;

import br.com.validatecaepi.model.User;
import br.com.validatecaepi.repository.UserRepository;
import br.com.validatecaepi.service.exception.AuthorizationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);

        if(user == null){
            throw new AuthorizationException("User is invalid");
        }

        return new UserSS(user.getId(), user.getEmail(), user.getPassword(), user.getRoles());
    }
}
