package br.com.apicaepi.model;

import java.io.Serializable;

public class Equipment implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private String description;
    private String brand;
    private String color;
    private String origin;

    private Manufacturer manufacturer;

    public Equipment(){
        super();
        this.manufacturer = new Manufacturer();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public Manufacturer getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
    }

    @Override
    public String toString() {
        return "Equipment{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", brand='" + brand + '\'' +
                ", color='" + color + '\'' +
                ", origin='" + origin + '\'' +
                ", manufacturer=" + manufacturer +
                '}';
    }
}
