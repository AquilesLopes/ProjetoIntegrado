package br.com.apicaepi.dto;

import br.com.apicaepi.model.Link;
import br.com.apicaepi.model.User;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


public class UserDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String firstname;
	private String lastname;
	private String email;
	private String profile;

	private String iconImage64;

	private LocalDateTime created;

	private LocalDateTime update;

	private List<Link> links = new ArrayList<Link>();

	public UserDto() {
	}
	
	public UserDto(User obj) {
		firstname = obj.getFirstname();
		lastname = obj.getLastname();
		email = obj.getEmail();
		profile = obj.getRoles().toString();
		created = obj.getCreated();
		update = obj.getUpdate();
		iconImage64 = obj.getIconImage64();
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

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public List<Link> getLinks() {
		return links;
	}

	public void setLinks(List<Link> links) {
		this.links = links;
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

	public String getIconImage64() {
		return iconImage64;
	}

	public void setIconImage64(String iconImage64) {
		this.iconImage64 = iconImage64;
	}
}
