package br.com.apicaepi.repository;

import br.com.apicaepi.model.InfoDataBase;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface InfoDataBaseRepository extends MongoRepository<InfoDataBase, String> {

}
