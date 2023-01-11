package br.com.validatecaepi.service;

import br.com.validatecaepi.model.Caepi;
import br.com.validatecaepi.util.CaepiUtil;
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
public class BaseFileService {

    public static List<Caepi> getBaseCaepi(String fileName){
        try {
            List<Caepi> caepiList = readBaseCaepiByFile(fileName);
            return caepiList;
        } catch (IOException e) {
            return new ArrayList<Caepi>();
        }
    }

    private static List<Caepi> readBaseCaepiByFile(String fileName) throws IOException {
        List<Caepi> listCaepi = new ArrayList<Caepi>();
        LocalDateTime lastModifiedTime;

        File file = ResourceUtils.getFile("classpath:templates/" + fileName);
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
            Caepi caepi = CaepiUtil.parseLineTxtToCaepi(line);

            if(caepi != null && caepi.getNumber() > 0 && !caepi.getStatus().equalsIgnoreCase("ERROR")){
                caepi.setUpdate(lastModifiedTime);
                Caepi caepiAdded = CaepiUtil.getCaepiInList(listCaepi, caepi.getNumber());

                if(caepiAdded != null){
                    listCaepi.remove(caepiAdded);
                    listCaepi.add(caepi);
                }else{
                    listCaepi.add(caepi);
                }
            }
        }

        return listCaepi;
    }


}
