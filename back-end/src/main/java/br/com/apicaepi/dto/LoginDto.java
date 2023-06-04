package br.com.apicaepi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public class LoginDto implements Serializable {
    private static final long serialVersionUID = 1L;
    @NotBlank(message = "Email is mandatory")
    @Size(min = 10, max = 100, message = "must contain between 10 and 100 characters")
    private String email;
    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, max = 15, message = "must contain between 6 and 15 characters")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
