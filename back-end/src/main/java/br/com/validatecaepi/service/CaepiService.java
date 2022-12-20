package br.com.validatecaepi.service;

import br.com.validatecaepi.dto.CaepiDto;
import br.com.validatecaepi.model.Caepi;
import br.com.validatecaepi.repository.CaepiRepository;
import br.com.validatecaepi.service.exception.DataIntegrityException;
import br.com.validatecaepi.service.exception.ObjectNotFoundException;
import br.com.validatecaepi.util.HandlerCNPJ;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class CaepiService {

    private final CaepiRepository repoCaepi;
    private UrlMapperService urlMapperService;

    @Autowired
    public CaepiService(CaepiRepository repoCaepi, UrlMapperService urlMapperService) {
        this.repoCaepi = repoCaepi;
        this.urlMapperService = urlMapperService;
    }

    public CaepiDto findByNumber(long number) {
        Caepi caepi = repoCaepi.findByNumber(number);

        if(caepi != null && caepi.getNumber() > 0){
            CaepiDto caepiDto = new CaepiDto(caepi);
            urlMapperService.mapperCaepiDTO(caepiDto);
            return caepiDto;
        }else{
            throw new ObjectNotFoundException("Certificate EPI not found");
        }
    }

    public Page<CaepiDto> findByLaboratory(String cnpj, int pageNumber, int pageSize) {
        if(pageSize > 20){
            throw new DataIntegrityException("The maximum value for variable 'size' is 20");
        }else if(pageSize < 3){
            throw new DataIntegrityException("The minimum value for variable 'size' is 3");
        }

        try{
            cnpj = HandlerCNPJ.getNumbers(cnpj);
            if(!HandlerCNPJ.isCNPJ(cnpj)){
                throw new DataIntegrityException("The CNPJ number is invalid");
            }
        }catch (Exception e){
            throw new DataIntegrityException("The CNPJ number is invalid");
        }

        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("number").descending());
        Page<Caepi> page = repoCaepi.findByReportLaboratoryCnpj(cnpj, pageable);

        if(page.getTotalElements() == 0){
            throw new ObjectNotFoundException("Laboratory not found");
        }

        Page<CaepiDto> dtoPage = page.map(this::convertCaepiToCaepiDto);

        return dtoPage;
    }

    public Page<CaepiDto> findByManufacturer(String cnpj, int pageNumber, int pageSize) {
        if(pageSize > 20){
            throw new DataIntegrityException("The maximum value for variable 'size' is 20");
        }else if(pageSize < 3){
            throw new DataIntegrityException("The minimum value for variable 'size' is 3");
        }

        try{
            cnpj = HandlerCNPJ.getNumbers(cnpj);
            if(!HandlerCNPJ.isCNPJ(cnpj)){
                throw new DataIntegrityException("The CNPJ number is invalid");
            }
        }catch (Exception e){
            throw new DataIntegrityException("The CNPJ number is invalid");
        }

        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by("number").descending());
        Page<Caepi> page = repoCaepi.findByEquipmentManufacturerCnpj(cnpj, pageable);

        if(page.getTotalElements() == 0){
            throw new ObjectNotFoundException("Manufacturer not found");
        }

        Page<CaepiDto> dtoPage = page.map(this::convertCaepiToCaepiDto);

        return dtoPage;
    }

    private CaepiDto convertCaepiToCaepiDto(Caepi caepi){
        CaepiDto caepiDto = new CaepiDto(caepi);
        urlMapperService.mapperCaepiDTO(caepiDto);
        return caepiDto;
    }

}
