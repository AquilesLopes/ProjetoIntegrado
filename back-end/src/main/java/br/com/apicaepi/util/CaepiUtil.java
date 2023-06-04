package br.com.apicaepi.util;

import br.com.apicaepi.model.Caepi;

import java.util.List;
import java.util.regex.Pattern;

public class CaepiUtil {

    public static Caepi parseLineTxtToCaepi(String line){
        Caepi caepi = new Caepi();

        try{
            String delim = "|";
            String regex = "(?<!\\\\)" + Pattern.quote(delim);
            String[] values = line.split(regex);

            caepi.setNumber(Long.parseLong(values[0]));
            caepi.setValidity(DateConverter.strToLocalDate(values[1], "dd/MM/yyyy"));
            caepi.setStatus(values[2]);
            caepi.getReport().setProcess(values[3]);
            caepi.getEquipment().getManufacturer().setCnpj(values[4]);
            caepi.getEquipment().getManufacturer().setName(values[5]);
            caepi.getEquipment().setOrigin(values[6]);
            caepi.getEquipment().setName(values[7]);
            caepi.getEquipment().setDescription(values[8]);
            caepi.getEquipment().setBrand(values[9]);
            caepi.getReport().setReference(values[10]);
            caepi.getEquipment().setColor(values[11]);
            caepi.getReport().setApprovedFor(values[12]);
            caepi.getReport().setRestriction(values[13]);
            caepi.getReport().setObservation(values[14]);
            caepi.getReport().getLaboratory().setCnpj(values[15]);
            caepi.getReport().getLaboratory().setName(values[16]);
            caepi.getReport().setReportNumber(values[17]);
            caepi.getReport().setStandard(values[18]);
        }catch (Exception e) {
            caepi.setStatus("ERROR");
            return caepi;
        }

        return caepi;
    }

    public static Caepi getCaepiInList(List<Caepi> listCaepi, long number){
        for(Caepi c : listCaepi){
            if(c.getNumber() == number){
                return c;
            }
        }
        return null;
    }

}
