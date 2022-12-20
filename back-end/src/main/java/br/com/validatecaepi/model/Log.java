package br.com.validatecaepi.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import br.com.validatecaepi.enuns.Type;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="logs")
public class Log implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	private String id;
	private String idUser;
	private String message;
	private LocalDateTime created;
	private Type type;

	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Type getType() {
		return type;
	}
	public void setType(Type type) {
		this.type = type;
	}
	public LocalDateTime getCreated() {
		return created;
	}
	public void setCreated(LocalDateTime created) {
		this.created = created;
	}
	public String getIdUser() {
		return idUser;
	}
	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Log log)) return false;

		if (!getId().equals(log.getId())) return false;
		return getType() == log.getType();
	}

	@Override
	public int hashCode() {
		int result = getId().hashCode();
		result = 31 * result + getType().hashCode();
		return result;
	}

	@Override
	public String toString() {
		return "Log{" +
				"id='" + id + '\'' +
				", idUser='" + idUser + '\'' +
				", message='" + message + '\'' +
				", created=" + created +
				", type=" + type +
				'}';
	}
}
