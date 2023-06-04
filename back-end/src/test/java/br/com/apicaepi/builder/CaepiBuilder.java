package br.com.apicaepi.builder;

import br.com.apicaepi.model.Caepi;

import java.util.ArrayList;
import java.util.List;

public class CaepiBuilder {
    private Caepi caepi;
    private CaepiBuilder(){}

    public static CaepiBuilder createOne(){
        CaepiBuilder builder = new CaepiBuilder();
        builder.caepi = new Caepi();
        builder.caepi.setNumber(8000);
        builder.caepi.getEquipment().setName("Luva");
        builder.caepi.setStatus("VALIDO");
        return builder;
    }

    public CaepiBuilder withNumber(long number){
        caepi.setNumber(number);
        return this;
    }

    public Caepi builder(){
        return caepi;
    }

    public static List<Caepi> createList(int size){
        List<Caepi> listCaepi = new ArrayList<Caepi>();
        for(int i = 0; i < size; i++){
            Caepi caepi = new Caepi();
            caepi.setNumber(8000 + i);
            caepi.getEquipment().setName("Luva " + i);
            listCaepi.add(caepi);
        }
        return listCaepi;
    }


}
