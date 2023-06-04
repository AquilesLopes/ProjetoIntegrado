package br.com.apicaepi.model;

import br.com.apicaepi.dto.RegisterDto;
import br.com.apicaepi.enuns.Role;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Document(collection="users")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	private String id;
	private String firstname;
	private String lastname;
	private String email;
	private int loginAttempt;
	private String observation;
	private String password;
	private String status;
	private String code;

	private String iconImage64;
	private LocalDateTime created;
	private LocalDateTime update;
	private Set<Role> roles = new HashSet<>();
	
	public User() {
	}

	public User(String id, String firstname, String lastname, String email, String profile) {
		super();
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email.toLowerCase().trim();
		addProfile(profile);
	}

	public User(RegisterDto registerDto) {
		super();
		this.id = null;
		this.firstname = registerDto.getFirstname();
		this.lastname = registerDto.getLastname();
		this.email = registerDto.getEmail().toLowerCase().trim();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

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
	
	public void addProfile(String profile) {
		if(profile.equals("ADMIN")) {
			roles.add(Role.ROLE_ADMIN);
		} else if(profile.equals("USER")) {
			roles.add(Role.ROLE_USER);
		}
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public LocalDateTime getUpdate() {
		return update;
	}

	public void setUpdate(LocalDateTime update) {
		this.update = update;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getLoginAttempt() {
		return loginAttempt;
	}

	public void setLoginAttempt(int loginAttempt) {
		this.loginAttempt = loginAttempt;
	}

	public String getObservation() {
		return observation;
	}

	public void setObservation(String observation) {
		this.observation = observation;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof User)) return false;

		User user = (User) o;

		return getId() != null ? getId().equals(user.getId()) : user.getId() == null;
	}

	@Override
	public int hashCode() {
		int result = getId().hashCode();
		result = 31 * result + getEmail().hashCode();
		return result;
	}

	@Override
	public String toString() {
		return "User{" +
				"id='" + id + '\'' +
				", firstname='" + firstname + '\'' +
				", lastname='" + lastname + '\'' +
				", email='" + email + '\'' +
				", loginAttempt=" + loginAttempt +
				", observation='" + observation + '\'' +
				", password='" + password + '\'' +
				", status='" + status + '\'' +
				", code='" + code + '\'' +
				", created=" + created +
				", update=" + update +
				", roles=" + roles +
				'}';
	}

	public String getIconImage64() {
		return iconImage64;
	}

	public void setIconImage64(String iconImage64) {
		this.iconImage64 = iconImage64;
	}
}
