package br.com.apicaepi.model;

import java.io.Serializable;

public class Manufacturer implements Serializable {
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
        return "Manufacturer{" +
                "name='" + name + '\'' +
                ", cnpj='" + cnpj + '\'' +
                '}';
    }


}
