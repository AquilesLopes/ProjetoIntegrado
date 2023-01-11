package br.com.validatecaepi.test;

import br.com.validatecaepi.model.Caepi;
import br.com.validatecaepi.service.BaseCaepiSerializableService;

import java.io.IOException;
import java.net.SocketException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class QtdCAEPI {

    static BaseCaepiSerializableService baseCaepiSerializable = new BaseCaepiSerializableService();

    public static void main (String[] args) throws SocketException, IOException {
        String fileName = "data_base_caepi.serializable";
        List<Caepi> caepiList = baseCaepiSerializable.readFileListCaepi(fileName);
        LocalDateTime dateUpdate = caepiList.get(0).getUpdate();

        Map<String,Integer> mapStatus = new HashMap<String,Integer>();
        mapStatus.put("VÁLIDO", 0);
        mapStatus.put("VENCIDO", 0);
        mapStatus.put("EXPEDIDO", 0);
        mapStatus.put("SUSPENSO", 0);
        mapStatus.put("CANCELADO", 0);
        Map<String,Integer> mapOrigin = new HashMap<String,Integer>();
        mapOrigin.put("Nacional", 0);
        mapOrigin.put("Importado", 0);
        Map<String, Integer> mapManufacturer = new HashMap<String, Integer>();
        Map<String, Integer> mapLab = new HashMap<String, Integer>();

        for(Caepi caepi : caepiList){
            for (Map.Entry<String,Integer> pair : mapStatus.entrySet()) {
                if(pair.getKey().equalsIgnoreCase(caepi.getStatus())){
                    mapStatus.put(pair.getKey(), pair.getValue() + 1);
                    break;
                }
            }

            for (Map.Entry<String,Integer> pair : mapOrigin.entrySet()) {
                if(pair.getKey().equalsIgnoreCase(caepi.getEquipment().getOrigin())){
                    mapOrigin.put(pair.getKey(), pair.getValue() + 1);
                    break;
                }
            }

            mapManufacturer.put(caepi.getEquipment().getManufacturer().getCnpj(), 0);
            mapLab.put(caepi.getReport().getLaboratory().getCnpj(), 0);
        }

        DateTimeFormatter customFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");;
        String formattedString = dateUpdate.format(customFormat);
        System.out.println("Atualizado em " + formattedString);

        System.out.println("---------\n\nOrigem: ");
        mapOrigin.forEach((key, value) -> {
            System.out.println(key + ": " + value);
        });

        System.out.println("---------\n");
        System.out.println("Fabricantes: " + mapManufacturer.size());
        System.out.println("Laboratórios: " + mapLab.size());

        System.out.println("---------\n");
        mapStatus.forEach((key, value) -> {
            System.out.println(key + ": " + value);
        });
        System.out.println("---------\nTotal: " + caepiList.size());

    }
}
