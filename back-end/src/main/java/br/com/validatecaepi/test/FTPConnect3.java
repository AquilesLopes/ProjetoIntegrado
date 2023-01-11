package br.com.validatecaepi.test;

import br.com.validatecaepi.util.DateConverter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.SocketException;
import java.net.URL;
import java.net.URLConnection;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

public class FTPConnect3 {

    public static void main (String[] args) throws SocketException, IOException {
        String link = "ftp://ftp.mtps.gov.br";
        String path = "/portal/fiscalizacao/seguranca-e-saude-no-trabalho/caepi/tgg_export_caepi.txt";

        URL url = new URL(link + path);
        URLConnection conn = url.openConnection();
        BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "ISO-8859-1"));

        LocalDateTime start = LocalDateTime.now();

        String line;
        int cont = 0;
        while ( (line = reader.readLine()) != null ) {
            System.out.println(line);
            cont++;
        }

        System.out.println("\n-------------------------\n");
        System.out.println("Start: " + start);
        System.out.println("End: " + LocalDateTime.now());
        System.out.println("Lines: " + cont);

        reader.close();
    }


}
