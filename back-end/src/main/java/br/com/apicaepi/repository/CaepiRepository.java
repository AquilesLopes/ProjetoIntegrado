package br.com.apicaepi.repository;

import br.com.apicaepi.model.Caepi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CaepiRepository extends MongoRepository<Caepi, String> {

    Caepi findByNumber(long number);

    Page<Caepi> findByReportLaboratoryCnpj(String cnpj, Pageable pageable);

    Page<Caepi> findByEquipmentManufacturerCnpj(String cnpj, Pageable pageable);

    @Query(value="{'number': ?0}", fields="{'number': 1, 'status':  1, 'update':  1, 'validity':  1, 'equipment.name':  1}")
    Caepi findSimpleByNumber(long number);
}
