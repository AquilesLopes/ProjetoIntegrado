package br.com.apicaepi.dto;

import java.io.Serializable;


public class ChangePasswordDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String cpf;
	private String oldPassword;
	private String newPassword;
	private String confirmPassword;
	
	public ChangePasswordDto() {
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

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

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	
}
