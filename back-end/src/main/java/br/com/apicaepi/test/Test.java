package br.com.apicaepi.test;

import br.com.apicaepi.model.Caepi;
import br.com.apicaepi.service.BaseCaepiSerializableService;
import br.com.apicaepi.service.BaseFileService;
import java.util.List;

public class Test {

    public static void main (String[] args) {
        String fileName = "tgg_export_caepi.txt";
        List<Caepi> listCaepi = BaseFileService.getBaseCaepi(fileName);
        System.out.println("Size CAEPI: " + listCaepi.size());
        fileName = "data_base_caepi.serializable";
        BaseCaepiSerializableService.saveFileListCaepi(listCaepi, fileName);
    }
}
