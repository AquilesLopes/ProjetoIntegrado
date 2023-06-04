package br.com.apicaepi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public class UpdatePasswordUserDto implements Serializable {
    private static final long serialVersionUID = 1L;
    @NotBlank(message = "Old password is mandatory")
    @Size(min = 6, max = 15, message = "must contain between 6 and 15 characters")
    private String oldPassword;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, max = 15, message = "must contain between 6 and 15 characters")
    private String newPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
