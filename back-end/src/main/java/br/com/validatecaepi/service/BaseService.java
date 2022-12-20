package br.com.validatecaepi.service;

import br.com.validatecaepi.model.Caepi;
import br.com.validatecaepi.util.DateConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class BaseService {

    public static List<Caepi> getBaseCaepi(String urlFile){
        try {
            List<Caepi> caepiList = readBaseCaepiByFile(urlFile);
            return caepiList;
        } catch (IOException e) {
            return new ArrayList<Caepi>();
        }
    }

    private static List<Caepi> readBaseCaepiByFile(String urlFile) throws IOException {
        List<Caepi> listCaepi = new ArrayList<Caepi>();
        LocalDateTime lastModifiedTime;

        File file = ResourceUtils.getFile(urlFile);
        FileReader fr = new FileReader(file, StandardCharsets.ISO_8859_1);
        BufferedReader br = new BufferedReader(fr);
        String line;

        try{
            BasicFileAttributes attr = Files.readAttributes(file.toPath(), BasicFileAttributes.class);
            lastModifiedTime = DateConverter.fileTimeToLocalDateTime(attr.lastModifiedTime());
            lastModifiedTime = lastModifiedTime == null ? LocalDateTime.now() : lastModifiedTime;
        } catch (Exception e){
            lastModifiedTime = LocalDateTime.now();
        }

        if(lastModifiedTime == null){
            lastModifiedTime = LocalDateTime.now();
        }

        while((line = br.readLine()) != null){
            Caepi caepi = parseLineTxtToCaepi(line);

            if(caepi != null && caepi.getNumber() > 0 && !caepi.getStatus().equalsIgnoreCase("ERROR")){
                caepi.setUpdate(lastModifiedTime);
                List<Caepi> filter = listCaepi.stream().filter(ca -> ca.getNumber() == caepi.getNumber()).collect(Collectors.toList());

                if(filter.size() > 0){
                    Caepi ca = filter.get(0);
                    ca = caepi;
                }else{
                    listCaepi.add(caepi);
                }
            }
        }

        return listCaepi;
    }

    private static Caepi parseLineTxtToCaepi(String line){
        Caepi caepi = new Caepi();

        try{
            String delim = "|";
            String regex = "(?<!\\\\)" + Pattern.quote(delim);
            String[] values = line.split(regex);

            caepi.setNumber(Long.parseLong(values[0]));
            caepi.setValidity(DateConverter.strToLocalDate(values[1], "dd/MM/yyyy"));
            caepi.setStatus(values[2]);
            caepi.getReport().setReportNumber(values[3]);
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

}
