package br.com.validatecaepi.service;

import br.com.validatecaepi.dto.RegisterDto;
import br.com.validatecaepi.dto.UserDto;
import br.com.validatecaepi.enuns.Roles;
import br.com.validatecaepi.model.User;
import br.com.validatecaepi.repository.UserRepository;
import br.com.validatecaepi.service.exception.AuthorizationException;
import br.com.validatecaepi.service.exception.DataIntegrityException;
import br.com.validatecaepi.util.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto register(RegisterDto registerDto){
        if(!ValidatorUtil.isEmailValid(registerDto.getEmail())){
            throw new DataIntegrityException("Email is invalid.");
        }else if(userRepository.findByEmail(registerDto.getEmail()) != null){
            throw new DataIntegrityException("E-mail already registered.");
        }

        User user = new User(registerDto);
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.getRoles().add(Roles.ROLE_USER);

        userRepository.save(user);

        return new UserDto(user);
    }

    public UserDto findByEmail(String email) {
        if(!ValidatorUtil.isEmailValid(email)){
            throw new DataIntegrityException("Email is invalid.");
        }

        email = email.toLowerCase().trim();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalEmail = authentication.getName();

        if(!email.equalsIgnoreCase(currentPrincipalEmail)){
            throw new AuthorizationException("You don't have permission.");
        }

        UserDto userDto = new UserDto(userRepository.findByEmail(email));

        return userDto;
    }

















}
