package br.com.apicaepi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public class UpdateUserDto implements Serializable {
    private static final long serialVersionUID = 1L;
    @NotBlank(message = "is mandatory")
    @Size(min = 5, max = 30, message = "must contain between 5 and 30 characters")
    private String firstname;
    @NotBlank(message = "is mandatory")
    @Size(min = 10, max = 100, message = "must contain between 10 and 100 characters")
    private String lastname;
    @NotBlank(message = "Email is mandatory")
    @Size(min = 10, max = 100, message = "must contain between 10 and 100 characters")
    private String email;

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
