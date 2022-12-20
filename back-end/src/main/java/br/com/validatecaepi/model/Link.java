package br.com.validatecaepi.model;

import java.util.HashMap;
import java.util.Map;

public class Link {

    private String url;
    private String description;
    private String type;

    private Map<String,String> parameters = new HashMap<String,String>();

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Map<String, String> getParameters() {
        return parameters;
    }

    public void setParameters(String key, String value) {
        this.parameters.put(key, value);
    }

    @Override
    public String toString() {
        return "Link{" +
                "url='" + url + '\'' +
                ", description='" + description + '\'' +
                ", type='" + type + '\'' +
                ", parameters=" + parameters +
                '}';
    }
}
