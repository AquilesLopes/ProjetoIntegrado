package br.com.apicaepi.dto;

import br.com.apicaepi.model.Caepi;
import br.com.apicaepi.model.Equipment;
import br.com.apicaepi.model.Link;
import br.com.apicaepi.model.Report;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CaepiDto implements Serializable {
    private static final long serialVersionUID = 1L;
    private long number;
    private String status;
    private LocalDateTime update;
    private LocalDate validity;
    private Equipment equipment;
    private Report report;
    private List<Link> links = new ArrayList<Link>();

    public CaepiDto(){
        super();
        this.equipment = new Equipment();
        this.report = new Report();
    }

    public CaepiDto(Caepi caepi){
        this.number = caepi.getNumber();
        this.equipment = caepi.getEquipment();
        this.report = caepi.getReport();
        this.status = caepi.getStatus();
        this.update = caepi.getUpdate();
        this.validity = caepi.getValidity();
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

    public List<Link> getLinks() {
        return links;
    }

    public void setLinks(List<Link> links) {
        this.links = links;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CaepiDto)) return false;

        CaepiDto caepiDto = (CaepiDto) o;

        return getNumber() == caepiDto.getNumber();
    }

    @Override
    public int hashCode() {
        return (int) (getNumber() ^ (getNumber() >>> 32));
    }

    @Override
    public String toString() {
        return "CaepiDTO{" +
                "number=" + number +
                ", status='" + status + '\'' +
                ", update=" + update +
                ", validity=" + validity +
                ", equipment=" + equipment +
                ", report=" + report +
                ", links=" + links +
                '}';
    }
}
