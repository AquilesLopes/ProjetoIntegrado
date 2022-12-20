package br.com.validatecaepi.dto;

import br.com.validatecaepi.model.Link;
import br.com.validatecaepi.model.User;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class UserDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String firstname;
	private String lastname;
	private String email;
	private String profile;

	private List<Link> links = new ArrayList<Link>();

	public UserDto() {
	}
	
	public UserDto(User obj) {
		id = obj.getId();
		firstname = obj.getFirstname();
		lastname = obj.getLastname();
		email = obj.getEmail();
		profile = obj.getRoles().toString();
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


	
}
