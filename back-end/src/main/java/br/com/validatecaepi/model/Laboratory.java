package br.com.validatecaepi.model;

import java.io.Serializable;

public class Laboratory implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private String cnpj;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCnpj() {
        return cnpj;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    @Override
    public String toString() {
        return "Laboratory{" +
                "name='" + name + '\'' +
                ", cnpj='" + cnpj + '\'' +
                '}';
    }
}
