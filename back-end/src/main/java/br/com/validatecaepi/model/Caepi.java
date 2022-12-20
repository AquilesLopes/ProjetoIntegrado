package br.com.validatecaepi.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection="caepi")
public class Caepi {

    @Id
    private String id;
    private long number;
    private String status;
    private LocalDateTime update;
    private LocalDate validity;
    private Equipment equipment;
    private Report report;

    public Caepi(){
        super();
        this.equipment = new Equipment();
        this.report = new Report();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
        this.number = number;
    }

    public Equipment getEquipment() {
        return equipment;
    }

    public void setEquipment(Equipment equipment) {
        this.equipment = equipment;
    }

    public Report getReport() {
        return report;
    }

    public void setReport(Report report) {
        this.report = report;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getUpdate() {
        return update;
    }

    public void setUpdate(LocalDateTime update) {
        this.update = update;
    }

    public LocalDate getValidity() {
        return validity;
    }

    public void setValidity(LocalDate validity) {
        this.validity = validity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Caepi caepi)) return false;

        if (getNumber() != caepi.getNumber()) return false;
        return getId() != null ? getId().equals(caepi.getId()) : caepi.getId() == null;
    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (int) (getNumber() ^ (getNumber() >>> 32));
        return result;
    }

    @Override
    public String toString() {
        return "CAEPI{" +
                "id='" + id + '\'' +
                ", number=" + number +
                ", equipment=" + equipment +
                ", report=" + report +
                ", status='" + status + '\'' +
                ", update=" + update +
                ", validity=" + validity +
                '}';
    }
}
