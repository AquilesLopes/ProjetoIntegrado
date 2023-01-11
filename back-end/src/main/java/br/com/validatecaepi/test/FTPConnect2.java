package br.com.validatecaepi.test;

import br.com.validatecaepi.util.DateConverter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.SocketException;
import java.net.URL;
import java.net.URLConnection;
import java.time.LocalDateTime;

public class FTPConnect2 {

    public static void main (String[] args) throws SocketException, IOException {
        String fileName = "tgg_export_caepi.txt";

        URL url = new URL("ftp://ftp.mtps.gov.br/portal/fiscalizacao/seguranca-e-saude-no-trabalho/caepi/");
        URLConnection conn = url.openConnection();
        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "ISO-8859-1"));

        String line;
        String dateUpdate = "";
        String timeUpdate = "";
        while ( (line = reader.readLine()) != null ) {
            System.out.println(line);
            if(line.contains(fileName)){
                String[] text = line.split(" ");
                dateUpdate = text[0];
                timeUpdate = text[2];
            }
        }

        System.out.println(dateUpdate + " " + timeUpdate);
        formatDateFromFtp(dateUpdate, timeUpdate);

        reader.close();
    }

    public static void formatDateFromFtp(String strDate, String strTime){
        String HH = strTime.substring(0, 2);
        String mm = strTime.substring(3, 5);
        String meridian = strTime.substring(5, 7);

        strDate += " " + HH + ":" + mm + ":00";

        LocalDateTime date = DateConverter.strToLocalDateTime(strDate, "MM-dd-yy HH:mm:ss");

        if(meridian.equalsIgnoreCase("PM")){
            date = date.plusHours(12);
        }

        System.out.println(date.toString());
    }
}
