package br.com.validatecaepi.dto;

import java.io.Serializable;

public class CredentialDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String email;
	private String password;
	
	public CredentialDto() {
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "CredentialDTO{" +
				"email='" + email + '\'' +
				", password='" + password + '\'' +
				'}';
	}
}
