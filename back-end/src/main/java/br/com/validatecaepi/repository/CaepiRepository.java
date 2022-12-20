package br.com.validatecaepi.repository;

import br.com.validatecaepi.model.Caepi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaepiRepository extends MongoRepository<Caepi, String> {

    Caepi findByNumber(long number);

    Page<Caepi> findByReportLaboratoryCnpj(String cnpj, Pageable pageable);

    Page<Caepi> findByEquipmentManufacturerCnpj(String cnpj, Pageable pageable);
}
