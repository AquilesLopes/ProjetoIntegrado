package br.com.validatecaepi.service;

import br.com.validatecaepi.model.Caepi;
import br.com.validatecaepi.util.CaepiUtil;
import br.com.validatecaepi.util.DateConverter;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BaseGovBrService {

    final static String LINK = "ftp://ftp.mtps.gov.br";
    final static String PATH = "/portal/fiscalizacao/seguranca-e-saude-no-trabalho/caepi/";
    final static String FILE_NAME = "tgg_export_caepi.txt";

    public static List<Caepi> getBaseCaepi(LocalDateTime lastModified){
        try {
            List<Caepi> caepiList = readBaseCaepiByGovBr(lastModified);
            return caepiList;
        } catch (IOException e) {
            return new ArrayList<Caepi>();
        }
    }

    public static LocalDateTime lastModifiedTimeBaseCaepiByGovBr() throws IOException {
        URL url = new URL(LINK + PATH);
        URLConnection conn = url.openConnection();
        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "ISO-8859-1"));

        String line;
        String dateUpdate = "";
        String timeUpdate = "";
        while ( (line = reader.readLine()) != null ) {
            if(line.contains(FILE_NAME)){
                String[] text = line.split(" ");
                dateUpdate = text[0];
                timeUpdate = text[2];
            }
        }

        LocalDateTime lastModified = DateConverter.formatDateFromFtp(dateUpdate, timeUpdate);

        reader.close();
        return lastModified;
    }

    private static List<Caepi> readBaseCaepiByGovBr(LocalDateTime lastModifiedTime) throws IOException {
        List<Caepi> listCaepi = new ArrayList<Caepi>();

        URL url = new URL(LINK + PATH + FILE_NAME);
        URLConnection conn = url.openConnection();
        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "ISO-8859-1"));

        String line;
        int count = 0;
        while ( (line = reader.readLine()) != null ) {
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

                count++;
                if(count == 5000){
                    count = 0;
                    System.out.println("Identified " + listCaepi.size() + " CAEPI");
                }
            }
        }

        return listCaepi;
    }



}
