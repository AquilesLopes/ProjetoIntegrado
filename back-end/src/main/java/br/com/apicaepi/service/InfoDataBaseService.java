package br.com.apicaepi.service;

import br.com.apicaepi.model.Caepi;
import br.com.apicaepi.model.InfoDataBase;
import br.com.apicaepi.repository.InfoDataBaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InfoDataBaseService {

    private final InfoDataBaseRepository infoDataBaseRepository;

    @Autowired
    public InfoDataBaseService(InfoDataBaseRepository infoDataBaseRepository){
        this.infoDataBaseRepository = infoDataBaseRepository;
    }

    public InfoDataBase getLastInfo(){
        Pageable pageable = PageRequest.of(0, 1, Sort.by("_id").descending());
        Page<InfoDataBase> page = infoDataBaseRepository.findAll(pageable);

        if(page.getContent().size() > 0){
            return page.getContent().get(0);
        }

        return new InfoDataBase();
    }

    public void generateInfo(List<Caepi> caepiList){
        InfoDataBase infoDataBase = new InfoDataBase();

        Map<String, Integer> mapManufacturer = new HashMap<String, Integer>();
        Map<String, Integer> mapLaboratory = new HashMap<String, Integer>();

        for(Caepi caepi : caepiList){

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

            infoDataBase.getMapStatus().put(keyStatus, infoDataBase.getMapStatus().get(keyStatus) + 1);
            infoDataBase.getMapOrigin().put(keyOrigin, infoDataBase.getMapOrigin().get(keyOrigin) + 1);

            for (Map.Entry<String,Integer> pair : infoDataBase.getMapStatus().entrySet()) {
                if(pair.getKey().equalsIgnoreCase(caepi.getStatus())){
                    infoDataBase.getMapStatus().put(pair.getKey(), pair.getValue() + 1);
                    break;
                }
            }

            for (Map.Entry<String,Integer> pair : infoDataBase.getMapOrigin().entrySet()) {
                if(pair.getKey().equalsIgnoreCase(caepi.getEquipment().getOrigin())){
                    infoDataBase.getMapOrigin().put(pair.getKey(), pair.getValue() + 1);
                    break;
                }
            }

            mapManufacturer.put(caepi.getEquipment().getManufacturer().getCnpj(), 0);
            mapLaboratory.put(caepi.getReport().getLaboratory().getCnpj(), 0);

            if(caepi.getNumber() > infoDataBase.getBiggestNumber()){
                infoDataBase.setBiggestNumber(caepi.getNumber());
            }

            if(caepi.getNumber() < infoDataBase.getMinorNumber()){
                infoDataBase.setMinorNumber(caepi.getNumber());
            }
        }

        infoDataBase.setId(null);
        infoDataBase.setDateUpdate(caepiList.get(0).getUpdate());
        infoDataBase.setTotal((long) caepiList.size());
        infoDataBase.setQtdManufacturer((long) mapManufacturer.size());
        infoDataBase.setQtdLaboratory((long) mapLaboratory.size());

        infoDataBaseRepository.save(infoDataBase);
    }

}
