package br.com.apicaepi.test;

import br.com.apicaepi.model.Caepi;

import java.io.IOException;
import java.net.SocketException;

public class TestInfoBaseCaepi {

    public static void main (String[] args) throws SocketException, IOException {
        Caepi caepi = new Caepi();
        caepi.setStatus("VALIDO");
        caepi.getEquipment().setOrigin("Importado");

        String keyStatus = "";
        switch (caepi.getStatus()) {
            case "VENCIDO":
                keyStatus = "EXPIRED";
                break;
            case "CANCELADO":
                keyStatus = "CANCELLED";
                break;
            case "VÁLIDO":
            case "VALIDO":
                keyStatus = "VALID";
                break;
            case "SUSPENSO":
                keyStatus = "SUSPENDED";
                break;
            case "EXPEDIDO":
                keyStatus = "ISSUED";
                break;
            default:
                keyStatus = "Unknown";
        }

        String keyOrigin = "";
        switch (caepi.getEquipment().getOrigin()) {
            case "Nacional":
                keyOrigin = "NATIONAL";
                break;
            case "Importado":
                keyOrigin = "IMPORTED";
                break;
            default:
                keyOrigin = "Unknown";
        }

        System.out.println(keyStatus);
        System.out.println(keyOrigin);
    }
}
