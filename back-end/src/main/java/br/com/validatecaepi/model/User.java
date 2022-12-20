package br.com.validatecaepi.model;

import br.com.validatecaepi.dto.RegisterDto;
import br.com.validatecaepi.enuns.Roles;
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
	private String name;
	private String email;
	private int loginAttempt;
	private String observation;
	private String password;
	private String status;
	private String code;
	private LocalDateTime created;
	private LocalDateTime update;
	private Set<Roles> roles = new HashSet<>();
	
	public User() {
	}

	public User(String id, String name, String email, String profile) {
		super();
		this.id = id;
		this.name = name;
		this.email = email.toLowerCase().trim();
		addProfile(profile);
	}

	public User(RegisterDto registerDto) {
		super();
		this.id = null;
		this.name = registerDto.getUserName();
		this.email = registerDto.getEmail().toLowerCase().trim();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public void addProfile(String profile) {
		if(profile.equals("ADMIN")) {
			roles.add(Roles.ROLE_ADMIN);
		} else if(profile.equals("USER")) {
			roles.add(Roles.ROLE_USER);
		}
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Roles> getRoles() {
		return roles;
	}

	public void setRoles(Set<Roles> roles) {
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
		if (!(o instanceof User user)) return false;

		if (!getId().equals(user.getId())) return false;
		return getEmail().equals(user.getEmail());
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
				", name='" + name + '\'' +
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
}
