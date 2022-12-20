package br.com.validatecaepi.dto;

import java.io.Serializable;
import java.util.Date;

public class AuthTokenJwtDto implements Serializable {
    private static final long serialVersionUID = 1L;

    private String accessToken;
    private Date expiration;

    private String type;

    public AuthTokenJwtDto(String accessToken, Date expiration, String type) {
        this.accessToken = accessToken;
        this.expiration = expiration;
        this.type = type;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
