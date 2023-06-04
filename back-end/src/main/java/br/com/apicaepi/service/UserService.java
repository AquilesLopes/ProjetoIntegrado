package br.com.apicaepi.service;

import br.com.apicaepi.dto.*;
import br.com.apicaepi.enuns.Role;
import br.com.apicaepi.model.User;
import br.com.apicaepi.repository.UserRepository;
import br.com.apicaepi.service.exception.AuthorizationException;
import br.com.apicaepi.service.exception.DataIntegrityException;
import br.com.apicaepi.util.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    private AuthService authService;

    @Autowired
    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthService authService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    public UserDto register(RegisterDto registerDto){
        if(!ValidatorUtil.isEmailValid(registerDto.getEmail())){
            throw new DataIntegrityException("Email is invalid.");
        }else if(userRepository.findByEmail(registerDto.getEmail()) != null){
            throw new DataIntegrityException("E-mail already registered.");
        }

        User user = new User(registerDto);
        user.setCreated(LocalDateTime.now());
        user.setUpdate(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.getRoles().add(Role.ROLE_USER);

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


    public UserDto updateUserLogged(UpdateUserDto updateUserDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalEmail = authentication.getName();

        User user = userRepository.findByEmail(currentPrincipalEmail);
        String newEmail = updateUserDto.getEmail().toLowerCase().trim();

        if(user.getEmail().equalsIgnoreCase(newEmail)){
            User userEmail = userRepository.findByEmail(newEmail);
            if(user.getId().equals(userEmail.getId())){
                throw new DataIntegrityException("E-mail already registered.");
            }
        }

        user.setFirstname(updateUserDto.getFirstname());
        user.setLastname(updateUserDto.getLastname());
        user.setEmail(newEmail);
        user.setUpdate(LocalDateTime.now());

        userRepository.save(user);

        UserDto userDto = new UserDto(user);
        return userDto;
    }

    public UserDto updateIconImage64(String iconImage64) {

        if(iconImage64 == null){
            throw new DataIntegrityException("Image is invalid.");
        }else if(iconImage64.length() > 150000){
            throw new DataIntegrityException("Image is too big.");
        }else if(iconImage64.length() < 50000){
            throw new DataIntegrityException("Image is too small.");
        }else if(!iconImage64.contains("data:image")){
            throw new DataIntegrityException("Image is invalid.");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalEmail = authentication.getName();

        User user = userRepository.findByEmail(currentPrincipalEmail);

        user.setIconImage64(iconImage64);
        user.setUpdate(LocalDateTime.now());

        userRepository.save(user);

        UserDto userDto = new UserDto(user);
        return userDto;
    }

    public void updatePassword(UpdatePasswordUserDto updatePasswordUserDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalEmail = authentication.getName();

        if(!authService.validPassword(currentPrincipalEmail, updatePasswordUserDto.getOldPassword())){
            throw new AuthorizationException("You don't have permission.");
        }

        User user = userRepository.findByEmail(currentPrincipalEmail);
        user.setPassword(passwordEncoder.encode(updatePasswordUserDto.getNewPassword()));
        user.setUpdate(LocalDateTime.now());

        userRepository.save(user);
    }
}
