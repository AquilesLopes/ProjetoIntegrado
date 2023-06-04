package br.com.apicaepi.model;

import java.io.Serializable;

public class Report implements Serializable {
    private static final long serialVersionUID = 1L;

    private String standard;
    private String reportNumber;
    private String process;
    private String restriction;
    private String reference;
    private String approvedFor;
    private String observation;
    private Laboratory laboratory;

    public Report(){
        super();
        this.laboratory = new Laboratory();
    }

    public Laboratory getLaboratory() {
        return laboratory;
    }

    public void setLaboratory(Laboratory laboratory) {
        this.laboratory = laboratory;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public String getReportNumber() {
        return reportNumber;
    }

    public void setReportNumber(String reportNumber) {
        this.reportNumber = reportNumber;
    }

    public String getObservation() {
        return observation;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public String getProcess() {
        return process;
    }

    public void setProcess(String process) {
        this.process = process;
    }

    public String getRestriction() {
        return restriction;
    }

    public void setRestriction(String restriction) {
        this.restriction = restriction;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getApprovedFor() {
        return approvedFor;
    }

    public void setApprovedFor(String approvedFor) {
        this.approvedFor = approvedFor;
    }

    @Override
    public String toString() {
        return "Report{" +
                "laboratory=" + laboratory +
                ", standard='" + standard + '\'' +
                ", reportNumber='" + reportNumber + '\'' +
                ", observation='" + observation + '\'' +
                ", process='" + process + '\'' +
                ", restriction='" + restriction + '\'' +
                ", reference='" + reference + '\'' +
                ", approvedFor='" + approvedFor + '\'' +
                '}';
    }
}
