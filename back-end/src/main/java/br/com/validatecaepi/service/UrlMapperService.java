package br.com.validatecaepi.service;

import br.com.validatecaepi.dto.CaepiDto;
import br.com.validatecaepi.model.Link;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UrlMapperService {

    @Value("${system.url.base}")
    private static String URL_BASE;

    public static void mapperCaepiDTO(CaepiDto caepiDTO){
        Link linkManufacturer = new Link();
        linkManufacturer.setUrl(URL_BASE + "/api/v1/manufacturer/" + caepiDTO.getEquipment().getManufacturer().getCnpj());
        linkManufacturer.setType("GET");
        linkManufacturer.setDescription("Returns a page CAEPI by manufacturer, sorted descending by caepi number");
        linkManufacturer.setOptionalParameters("page", "page number");
        linkManufacturer.setOptionalParameters("size", "Page size, minimum 3, maximum 20");

        Link linkLaboratory = new Link();
        linkLaboratory.setUrl(URL_BASE + "/api/v1/laboratory/" + caepiDTO.getReport().getLaboratory().getCnpj());
        linkLaboratory.setType("GET");
        linkLaboratory.setDescription("List CAEPI by laboratory, sorted descending by caepi number");
        linkManufacturer.setOptionalParameters("page", "page number");
        linkManufacturer.setOptionalParameters("size", "Page size, minimum 3, maximum 20");

        caepiDTO.getLinks().add(linkManufacturer);
        caepiDTO.getLinks().add(linkLaboratory);
    }
}